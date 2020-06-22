from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from django.shortcuts import reverse
from mixer.backend.django import mixer
from unittest import mock
from apps.exam.views import ExamCreateView, ExamUpdateView, ExamDeleteView
from apps.exam.models import Exam
import datetime


class TestExamCreateView(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.factory = APIRequestFactory()
        self.url = reverse("exam-create")
        self.problems = mixer.cycle(2).blend("exam.Problem", owner=self.user)
        self.serialized_problems = [
            {"name": problem.name, "author": problem.author}
            for problem in self.problems
        ]
        self.data = {
            "name": "Control 1",
            "teacher": "Jeremy Barbay",
            "university": "U. de Chile",
            "course_name": "Alg. y estructuras de datos",
            "course_code": "CC3001",
            "language": "ES",
            "due_date": datetime.datetime.now().date(),
            "start_time": datetime.datetime.now().time(),
            "end_time": (datetime.datetime.now() + datetime.timedelta(hours=2)).time(),
            "problems": self.serialized_problems,
        }

    def test_create_exam_anonymous(self):
        request = self.factory.post(self.url, self.data)
        response = ExamCreateView.as_view()(request)
        self.assertEqual(response.status_code, 401)

    @mock.patch("apps.exam.models.Exam.generate_pdf")
    def test_create_exam_authenticated(self, mock_generate_pdf):
        request = self.factory.post(self.url, self.data, format="json")
        force_authenticate(request, self.user)
        response = ExamCreateView.as_view()(request)
        self.assertEqual(response.status_code, 201)
        exam = Exam.objects.filter(name="Control 1", owner=self.user)
        self.assertTrue(exam.exists())


class TestExamUpdateView(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.factory = APIRequestFactory()
        self.problems = mixer.cycle(2).blend("exam.Problem", owner=self.user)
        self.exam = mixer.blend("exam.Exam", owner=self.user)
        self.exam.problems.set(self.problems)
        self.exam.save()
        self.url = reverse("exam-update", kwargs={"uuid": self.exam.uuid})
        self.serialized_problems = [
            {"name": problem.name, "author": problem.author}
            for problem in self.problems
        ]
        self.data = {
            "name": self.exam.name,
            "teacher": self.exam.teacher,
            "university": "U. de Chile",
            "course_name": "Alg. y estructuras de datos",
            "course_code": "CC3001",
            "language": self.exam.language,
            "due_date": self.exam.due_date,
            "start_time": self.exam.start_time,
            "end_time": self.exam.end_time,
            "problems": self.serialized_problems,
        }

    def test_anonymous_user(self):
        request = self.factory.put(self.url, self.data)
        response = ExamUpdateView.as_view()(request)
        self.assertEqual(response.status_code, 401)

    @mock.patch("apps.exam.models.Exam.generate_pdf")
    def test_update_exam(self, mock_generate_pdf):
        request = self.factory.put(self.url, self.data, format="json")
        force_authenticate(request, self.user)
        response = ExamUpdateView.as_view()(request, *[], **{"uuid": self.exam.pk})
        self.assertEqual(response.status_code, 200)
        exam = Exam.objects.get(pk=self.exam.pk)
        self.assertEqual(exam.university, self.data["university"])
        self.assertEqual(exam.course_name, self.data["course_name"])
        self.assertEqual(exam.course_code, self.data["course_code"])


class TestExamDeleteView(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.factory = APIRequestFactory()
        self.exam = mixer.blend("exam.Exam", owner=self.user)
        self.kwargs = {"uuid": self.exam.pk}

    def test_exam_delete_view(self):

        url = reverse("exam-delete", kwargs=self.kwargs)
        request = self.factory.delete(url)
        force_authenticate(request, self.user)
        response = ExamDeleteView.as_view()(request, *[], **self.kwargs)
        self.assertEqual(response.status_code, 204)
