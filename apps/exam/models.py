import os
import uuid
from datetime import date, datetime
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile, File
from django.db import models
from apps.exam.path_services import (
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
from typing import Tuple

User = get_user_model()


class Topic(models.Model):
    name = models.CharField(primary_key=True, max_length=100)

    def __str__(self) -> str:
        return self.name


class Problem(models.Model):
    """
    Problem model of easyexam

    Attributes:
        uuid {UUIDField} -- The unique identifier for the problem
        name {CharField} -- The name of the problem
        author {Charfield} -- The name of the author of the problem
        uploader {ForeignKey} -- Key to the author user instance of the problem
        statement_content {TextField} -- Text of the problem statement
        solution_content {TextField} -- Text of the problem solution
        tex_file {FileField} -- Tex file for rendering the problem
        pbtex_file {FileField} -- Problem tex file for putting in into the exam tex file
        pdf {FileField} -- Pdf file for rendering the problem
        topics {ManyToManyField} -- Topics for saying what the problem is about
    """

    # Primary Key
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Non file fields
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    uploader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    statement_content = models.TextField(max_length=50000)
    solution_content = models.TextField(max_length=50000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    topics = models.ManyToManyField(to=Topic)

    # File fields
    tex_file = models.FileField(upload_to=problem_tex_path, storage=OverwriteStorage())
    pbtex_file = models.FileField(
        upload_to=problem_pbtex_path, storage=OverwriteStorage()
    )
    pdf = models.FileField(upload_to=problem_pdf_path, storage=OverwriteStorage())

    # Non using legacy fields
    # cost = models.IntegerField(default=settings.PROBLEM_COST) #Legacy field
    # boolean indicating that the problem is valid in at least one criterion
    # validated = models.BooleanField(default=False) # Legacy field

    class Meta:
        unique_together = ("name", "author")

    @property
    def content(self):
        solution = "".join(
            ("\\begin{solution}\n", self.solution_content, "\n\\end{solution}")
        )
        return "".join((self.statement_content, solution))

    def save(self, *args, **kwargs) -> "Problem":
        if self.pk is None:
            self.pbtex_file = None
            super().save(*args, **kwargs)
        else:
            self.pbtex_file.save("", ContentFile(problem_pbtex(self)), save=False)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.name} -- {self.author}"

    def generate_pdf(self) -> None:
        self.tex_file.save("", ContentFile(problem_tex(self)), save=False)
        normal_path, solution_path = generate_pdfs(self)
        with open(solution_path, "rb") as file:
            self.pdf.save("", File(file), save=False)
        os.remove(normal_path)
        os.remove(solution_path)
        self.save()


class Image(models.Model):
    """
    Stores the problem images files within a name

    Params:
        name {CharField} -- The name of the image
        problem {ForeignKey} -- The problems on which the image belongs to
        image {ImageField} -- The file of the image
    """

    name = models.CharField(max_length=100)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=image_path, storage=OverwriteStorage())

    class Meta:
        unique_together = ("name", "problem")

    def __str__(self):
        return self.name


class Exam(models.Model):
    """
    Exam model of the application

    Attributes:
        uuid {UUIDField} -- Primary key of the model, is a unique identifier for the exam
        name {CharField} -- Name of the exam given by the user
        owner {ForeignKey} -- User creator of the exam
        teacher {CharField} -- Teacher of the course for this exam
        university {CharField} -- University on which this exam will take place
        course_name {CharField} -- Name of the course on which the exam will take place
        style {CharField} -- Style used on the exam pdf
        language {CharField} -- Language used on the exam pdf
        problems {ManyToManyField} -- Problems which will be on the exam
        due_date {DateField} -- Date that the exam will take place
        start_time {TimeField} -- Starting time of the exam
        end_time {TimeField} -- End time of the exam
        create_at {DateTimeField} -- Date and time on which the exam was created
        updated_at {DateTimeField} -- Date and time of the last update of the exam
        pdf_normal {FileField} -- Pdf of the exam without answers or marks
        pdf_solution {FileField} -- PDF file of the exam with the solution on it
        tex_file {FileField} -- Tex file on which the exam is written
    """

    # TODO add style choices logic
    # TODO add language choices
    STYLE_CHOICES = (("C", "Compact"), ("O", "Other"))
    LANGUAGE_CHOICES = (("EN", "English"), ("ES", "Spanish"))

    # Primary key
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # General Information
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    teacher = models.CharField(max_length=100)
    university = models.CharField(max_length=100)
    course_name = models.CharField(max_length=100)
    course_code = models.CharField(max_length=50, blank=True, null=True)
    style = models.CharField(max_length=1, choices=STYLE_CHOICES, default="C")
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default="EN")

    problems = models.ManyToManyField(to=Problem, through="ExamProblemChoice")

    # A lot of times and dates
    due_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Files, a lot of files
    pdf_normal = models.FileField(
        upload_to=exam_normal_path, storage=OverwriteStorage()
    )
    pdf_solution = models.FileField(
        upload_to=exam_solution_path, storage=OverwriteStorage()
    )
    tex_file = models.FileField(upload_to=exam_tex_path, storage=OverwriteStorage())

    class Meta:
        unique_together = ("name", "owner")  # Owner cant have exams with the same name

    @property
    def duration(self) -> Tuple[int, int]:
        time_delta = datetime.combine(date.min, self.end_time) - datetime.combine(
            date.min, self.start_time
        )
        return time_delta.seconds // 3600, time_delta.seconds % 3600

    @property
    def date(self):
        """
        Legacy compatibility reasons
        """
        return self.due_date

    @property
    def course(self):
        """
        Legacy compatibility reasons
        """
        return self.course_name

    @property
    def problem_choices(self):
        return self.examproblemchoice_set.all()

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.tex_file.save("", ContentFile(exam_tex(self)), save=False)

    def generate_pdf(self):
        normal_path, solution_path = generate_pdfs(self)
        with open(normal_path, "rb") as normal_file:
            self.pdf_normal.save("", File(normal_file), save=False)
        with open(solution_path, "rb") as solution_file:
            self.pdf_solution.save("", File(solution_file), save=False)
        os.remove(normal_path)
        os.remove(solution_path)
        self.save()


class ExamProblemChoice(models.Model):
    points = models.PositiveIntegerField(default=2)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("problem", "exam")
