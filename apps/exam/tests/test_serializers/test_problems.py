from django.test import TestCase
from mixer.backend.django import mixer
from apps.exam.models import Topic
from apps.exam.serializers import ProblemSerializer, ProblemEditSerializer
from django.conf import settings
from unittest import skip, mock


class TestProblemSerializer(TestCase):
    def setUp(self):
        self.problem = mixer.blend("exam.Problem")
        self.problem_data = {
            "": self.problem.pk,
            "name": self.problem.name,
            "author": self.problem.author,
            "created_at": str(self.problem.created_at),
            "topics": list(self.problem.topics.all()),
            "editable": True,
        }

    def test_empty_serializer(self):
        empty_problem = ProblemSerializer()
        self.assertEqual(empty_problem.data, {"topics": []})

    @skip("Failing created_at comparison because of time format")
    def test_problem_serializer_constructor(self):
        problem_serializer = ProblemSerializer(instance=self.problem)
        self.assertEqual(problem_serializer.data, self.problem_data)


class TestProblemEditSerializer(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")

    @mock.patch("apps.exam.models.Problem.generate_pdf")
    def test_create_serializer(self, generate_pdf_mock):
        problem_data = {
            "name": "John Snow is bored",
            "author": "John Snow",
            "statement_content": "John Snow is bored, then he went to get some apples",
            "solution_content": "He gets the apples",
            "topics_data": ["John snow", "apples"],
            "figures": [],
        }
        request = mock.MagicMock()
        request.user = self.user
        serializer = ProblemEditSerializer(
            data=problem_data, context={"request": request}
        )
        self.assertTrue(serializer.is_valid())
        problem = serializer.save()
        self.assertEqual(problem.name, "John Snow is bored")
        self.assertEqual(problem.author, "John Snow")
        self.assertEqual(problem.statement_content, problem_data["statement_content"])
        self.assertEqual(problem.solution_content, problem_data["solution_content"])
        self.assertTrue(Topic.objects.filter(name="John snow").exists())
        self.assertTrue(Topic.objects.filter(name="apples").exists())

    @mock.patch("apps.exam.models.Problem.generate_pdf")
    def test_update_serializer(self, generate_pdf_mock):
        problem = mixer.blend("exam.Problem", uploader=self.user)
        topic = mixer.blend("exam.Topic")
        problem_data = {
            "name": "John Snow is bored",
            "author": problem.author,
            "statement_content": "John Snow is bored, ...",
            "topics_data": [topic.name],
            "figures": [],
        }
        request = mock.MagicMock()
        request.user = self.user
        serializer = ProblemEditSerializer(instance=problem, data=problem_data)
        self.assertTrue(serializer.is_valid(raise_exception=True))
        problem = serializer.save()
        self.assertEqual(problem.name, "John Snow is bored")
        self.assertEqual(problem.statement_content, "John Snow is bored, ...")
