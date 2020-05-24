from django.test import TestCase
from django.shortcuts import reverse
from rest_framework.test import APIRequestFactory, force_authenticate
from mixer.backend.django import mixer

from apps.exam.views import ProblemListView, UserProblemListView, ProblemCreateView
from apps.exam.serializers import ProblemSerializer


class TestProblemListView(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.factory = APIRequestFactory()
        self.user_problems = mixer.cycle(5).blend("exam.Problem", uploader=self.user)
        self.other_problems = mixer.cycle(5).blend("exam.Problem", uploader=None)
        self.user_problems_serialized = [
            ProblemSerializer(instance=x).data for x in self.user_problems
        ]
        self.other_problems_serialized = [
            ProblemSerializer(instance=x).data for x in self.other_problems
        ]

    def test_list_all_view(self):
        url = reverse("problem-list")
        request = self.factory.get(url)
        force_authenticate(request, user=self.user)
        response = ProblemListView.as_view()(request)
        response_expected_data = (
            self.user_problems_serialized + self.other_problems_serialized
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), len(response_expected_data))
        for problem_data in response_expected_data:
            self.assertIn(problem_data, response.data)

    def test_user_list_view(self):
        url = reverse("user-problem-list")
        request = self.factory.get(url)
        force_authenticate(request, user=self.user)
        response = UserProblemListView.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(list(response.data), self.user_problems_serialized)


class TestProblemCreateView(TestCase):
    pass
