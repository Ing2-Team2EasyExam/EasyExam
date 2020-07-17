import datetime
from unittest import mock
from django.test import TestCase
from mixer.backend.django import mixer
from apps.exam import serializers
from collections import OrderedDict


class TestExamListSerializer(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.exam = mixer.blend("exam.Exam", user=self.user)

    def test_exam_list_serializer(self):
        serializer = serializers.ExamListSerializer(instance=self.exam)
        self.assertEqual(str(self.exam.uuid), serializer.data["uuid"])
        self.assertEqual(self.exam.name, serializer.data["name"])
        self.assertIsNotNone(serializer.data["updated_at"])


class TestProblemNestedSerializer(TestCase):
    def setUp(self):
        self.problem = mixer.blend("exam.Problem")
        self.data = {"name": self.problem.name, "author": self.problem.author}

    def test_valid_data(self):
        serializer = serializers.ProblemNestedSerializer(data=self.data)
        self.assertTrue(serializer.is_valid())


class TestExamEditSerializer(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.problems = mixer.cycle(2).blend("exam.Problem")
        self.serialized_problems = [
            {
                "points": 2,
                "problem": OrderedDict(name=problem.name, author=problem.author),
            }
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
            "problem_choices": self.serialized_problems,
        }

    @mock.patch("apps.exam.models.Exam.generate_pdf")
    @mock.patch("apps.exam.models.Problem.generate_pdf")
    def test_create_exam_from_serializer(
        self, mock_generate_pdf, mock_generate_problem
    ):
        request = mock.MagicMock()
        request.user = self.user
        context = {"request": request}
        serializer = serializers.ExamEditSerializer(context=context, data=self.data)
        self.assertTrue(serializer.is_valid(raise_exception=True))
        exam = serializer.save()
        self.assertIsNotNone(exam)

    @mock.patch("apps.exam.models.Exam.generate_pdf")
    @mock.patch("apps.exam.models.Problem.generate_pdf")
    def test_update_exam_from_serializer(
        self, mock_generate_pdf, mock_generate_problem
    ):
        request = mock.MagicMock()
        request.user = self.user
        context = {"request": request}
        exam = mixer.blend("exam.Exam")
        exam.problems.set(self.problems)
        exam.save()
        serializer = serializers.ExamEditSerializer(
            context=context, instance=exam, data=self.data
        )
        self.assertTrue(serializer.is_valid(raise_exception=True))
        exam = serializer.save()
        self.assertIsNotNone(exam)
