from django.test import TestCase
from mixer.backend.django import mixer
from apps.exam import serializers


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
