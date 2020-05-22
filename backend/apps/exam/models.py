import os
import uuid as uuid

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile, File
from django.db import models
from apps.exam.services import (
    exam_path,
    exam_normal_path,
    exam_solution_path,
    exam_tex_path,
    problem_path,
    problem_pbtex_path,
    problem_pdf_path,
    problem_tex_path,
    image_path,
)
from apps.exam.generate_exam.gen import (
    problem_pbtex,
    exam_tex,
    generate_pdfs,
    problem_tex,
)
from apps.exam.storage import OverwriteStorage

User = get_user_model()


class Topic(models.Model):
    name = models.CharField(max_length=100, unique=True)
    hidden = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Problem(models.Model):
    """
    Problem model of easyexam

    Attributes:
        uuid {UUIDField} -- The unique identifier for the problem
        name {CharField} -- The name of the problem
        author {Charfield} -- The name of the author of the problem
        uploader {ForeignKey} -- Key to the author user instance of the problem
        content {TextField} -- Text content of the problem
        tex_file {FileField} -- Tex file for rendering the problem
        pbtex_file {FileField} -- Problem tex file for putting in into the exam
        pdf {FileField} -- Pdf file for rendering the problem
        topics {ManyToManyField} -- Topics for saying what the problem is about
    """

    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    uploader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField(max_length=50000)
    tex_file = models.FileField(upload_to=problem_tex_path, storage=OverwriteStorage())
    pbtex_file = models.FileField(
        upload_to=problem_pbtex_path, storage=OverwriteStorage()
    )
    pdf = models.FileField(upload_to=problem_pdf_path, storage=OverwriteStorage())
    topics = models.ManyToManyField(to=Topic)

    # cost = models.IntegerField(default=settings.PROBLEM_COST) #Legacy field
    # boolean indicating that the problem is valid in at least one criterion
    # validated = models.BooleanField(default=False) # Legacy field

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.pbtex_file = None
            super().save(*args, **kwargs)
        else:
            self.pbtex_file.save("", ContentFile(problem_pbtex(self)), save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def generate_pdf(self):
        self.tex_file.save("", ContentFile(problem_tex(self)), save=False)
        normal_path, solution_path = generate_pdfs(self)
        with open(solution_path, "rb") as file:
            self.pdf.save("", File(file), save=False)
        os.remove(normal_path)
        os.remove(solution_path)
        self.save()


class Exam(models.Model):
    # TODO add style choices logic
    # TODO add language choices
    STYLE_CHOICES = (("C", "Compact"), ("O", "Other"))
    LANGUAGE_CHOICES = (("E", "English"), ("S", "Spanish"))

    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    university = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    teacher = models.CharField(max_length=100)
    style = models.CharField(max_length=1, choices=STYLE_CHOICES, default="C")
    course_code = models.CharField(max_length=50)
    is_paid = models.BooleanField(default=False)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    pdf_normal = models.FileField(
        upload_to=exam_normal_path, storage=OverwriteStorage()
    )
    pdf_solution = models.FileField(
        upload_to=exam_solution_path, storage=OverwriteStorage()
    )
    tex_file = models.FileField(upload_to=exam_tex_path, storage=OverwriteStorage())
    language = models.CharField(max_length=1, choices=LANGUAGE_CHOICES, default="E")
    problems = models.ManyToManyField(to=Problem)

    def save(self, *args, **kwargs):
        super(Exam, self).save(*args, **kwargs)
        self.tex_file.save("", ContentFile(exam_tex(self)), save=False)

    def generate_pdf(self):
        normal_path, solution_path = generate_pdfs(self)
        normal_file = open(normal_path, "rb")
        self.pdf_normal.save("", File(normal_file), save=False)
        normal_file.close()
        solution_file = open(solution_path, "rb")
        self.pdf_solution.save("", File(solution_file), save=False)
        solution_file.close()
        os.remove(normal_path)
        os.remove(solution_path)
        self.save()

    def calculate_cost(problems, user):
        cost = 0
        for problem in problems:
            if problem.uploader != user:
                cost += problem.cost
        return cost

    def __str__(self):
        return self.name


class Image(models.Model):
    name = models.CharField(max_length=100)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=image_path, storage=OverwriteStorage())

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ("name", "problem")
