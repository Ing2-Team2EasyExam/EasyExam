from django.test import TestCase
from django.shortcuts import reverse
from rest_framework.test import APIRequestFactory, force_authenticate
from mixer.backend.django import mixer

from apps.exam.models import Problem
from apps.exam.views import (
    ProblemListView,
    UserProblemListView,
    ProblemCreateView,
    ProblemUpdateView,
)
from apps.exam.serializers import ProblemSerializer
from unittest import mock


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

    def test_anonymous_user_cant_check_problems(self):
        url = reverse("problem-list")
        request = self.factory.get(url)
        response = ProblemListView.as_view()(request)
        self.assertEqual(response.status_code, 401)

    def test_anonymous_cant_access_user_view(self):
        url = reverse("user-problem-list")
        request = self.factory.get(url)
        response = UserProblemListView.as_view()(request)
        self.assertEqual(response.status_code, 401)

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


@mock.patch("apps.exam.models.Problem.generate_pdf")
class TestProblemCreateView(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = mixer.blend("user.User")
        self.url = reverse("problem-create")
        self.problem_data = {
            "name": "Papelero a mis papeles",
            "author": "Claudio Falcon",
            "statement_content": "Un avion de papel ...",
            "solution_content": "Considere el eje x ...",
            "topics_data": ["Fisica", "Parabola"],
            "figures": [],
        }

    def test_cant_create_problem_without_topics(self, pdf_mock):
        self.problem_data["topics_data"] = []
        request = self.factory.post(self.url, self.problem_data, format="json")
        force_authenticate(request, self.user)
        response = ProblemCreateView.as_view()(request)
        self.assertEqual(response.status_code, 400)

    def test_create_problem_on_post(self, pdf_mock):
        request = self.factory.post(self.url, self.problem_data, format="json")
        force_authenticate(request, self.user)
        response = ProblemCreateView.as_view()(request)
        self.assertEqual(response.status_code, 201)
        problem_data_queryset = Problem.objects.filter(
            name=self.problem_data["name"], author=self.problem_data["author"]
        )
        self.assertTrue(problem_data_queryset.exists())
        self.assertEqual(problem_data_queryset.count(), 1)

    def test_create_non_solution_on_problem(self, pdf_mock):
        self.problem_data["solution_content"] = ""
        request = self.factory.post(self.url, self.problem_data, format="json")
        force_authenticate(request, self.user)
        response = ProblemCreateView.as_view()(request)
        self.assertEqual(response.status_code, 201)
        problem_data_queryset = Problem.objects.filter(
            name=self.problem_data["name"], author=self.problem_data["author"]
        )
        self.assertTrue(problem_data_queryset.exists())
        self.assertEqual(problem_data_queryset.count(), 1)

    def test_anonymous_cant_create_problem(self, pdf_mock):
        request = self.factory.post(self.url, self.problem_data, format="json")
        response = ProblemCreateView.as_view()(request)
        self.assertEqual(response.status_code, 401)


@mock.patch("apps.exam.models.Problem.generate_pdf")
class TestProblemUpdateView(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.problem = mixer.blend("exam.Problem", uploader=self.user)
        self.factory = APIRequestFactory()
        self.kwargs = {"uuid": self.problem.pk}
        self.url = reverse("problem-update", kwargs=self.kwargs)
        self.data = {
            "name": self.problem.name,
            "author": self.problem.author,
            "statement_content": "Habia una vez...",
            "solution_content": self.problem.solution_content,
            "topics_data": ["Fisica"],
            "figures": [],
        }

    def test_retrieve_problem_from_data(self, generate_pdf_mock):
        request = self.factory.get(self.url)
        force_authenticate(request, self.user)
        response = ProblemUpdateView.as_view()(request, **self.kwargs)
        self.assertEqual(response.status_code, 200)

    def test_update_problem(self, generate_pdf_mock):
        request = self.factory.put(self.url, self.data, format="json")
        force_authenticate(request, self.user)
        response = ProblemUpdateView.as_view()(request, **self.kwargs)
        self.assertEqual(response.status_code, 200)

    def test_update_problem_with_exam(self, generate_pdf_mock):
        exam = mixer.blend("exam.Exam")
        exam.problems.add(self.problem)
        exam.save()
        get_request = self.factory.get(self.url)
        force_authenticate(get_request, self.user)
        get_response = ProblemUpdateView.as_view()(get_request, **self.kwargs)
        self.assertEqual(get_response.status_code, 200)
        put_request = self.factory.put(self.url, self.data, format="json")
        force_authenticate(put_request, self.user)
        put_response = ProblemUpdateView.as_view()(put_request, **self.kwargs)
        self.assertEqual(put_response.status_code, 400)

    def test_update_other_problem(self, generate_pdf_mock):
        other_user = mixer.blend("user.User")
        get_request = self.factory.get(self.url)
        force_authenticate(get_request, other_user)
        get_response = ProblemUpdateView.as_view()(get_request, **self.kwargs)
        self.assertEqual(get_response.status_code, 404)
        put_request = self.factory.put(self.url, self.data)
        force_authenticate(put_request, other_user)
        put_response = ProblemUpdateView.as_view()(put_request, **self.kwargs)
        self.assertEqual(put_response.status_code, 404)

    def test_anonymous_cant_update_problem(self, generate_pdf_mock):
        get_request = self.factory.get(self.url)
        put_request = self.factory.put(self.url, self.data)
        get_response = ProblemUpdateView.as_view()(get_request, **self.kwargs)
        put_response = ProblemUpdateView.as_view()(put_request, **self.kwargs)
        self.assertEqual(get_response.status_code, 401)
        self.assertEqual(put_response.status_code, 401)
