from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.authtoken.models import Token
from django.shortcuts import reverse
from apps.user import views
from mixer.backend.django import mixer
import pytest


class TestLoginView(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.url = reverse("login")
        self.email = "cosme@fulanito.com"
        self.password = "Me da una copilla porfavor"
        self.data = {"email": self.email, "password": self.password}

    def test_request_no_data(self):
        request = self.factory.post(self.url)
        response = views.LoginView.as_view()(request)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data, {"error": "Please provide both username and password"}
        )

    def test_request_non_existant_user(self):
        request = self.factory.post(self.url, data=self.data, format="json")
        response = views.LoginView.as_view()(request)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data, {"error": "Invalid Credentials"})

    def test_valid_login(self):
        user = mixer.blend("user.User", email=self.email, is_active=True)
        user.set_password(self.password)
        user.save()
        request = self.factory.post(self.url, data=self.data, format="json")
        response = views.LoginView.as_view()(request)
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.data)
        self.assertIsNotNone(response.data["token"])


class TestLogoutView(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.url = reverse("logout")
        self.user = mixer.blend("user.User")

    def test_non_authenticated_request(self):
        request = self.factory.delete(self.url)
        response = views.LogoutView.as_view()(request)
        self.assertEqual(response.status_code, 401)

    def test_authenticated_user_logout(self):
        request = self.factory.delete(self.url)
        Token.objects.create(user=self.user)
        force_authenticate(request, self.user)
        response = views.LogoutView.as_view()(request)
        self.assertEqual(response.status_code, 200)


@pytest.fixture
def factory():
    return APIRequestFactory()


@pytest.fixture
def cosme_credentials():
    return {
        "email": "cosme@fulanito.com",
        "first_name": "Cosme",
        "last_name": "fulanito",
        "password": "Me da una copilla porfavor",
    }


@pytest.mark.django_db
@pytest.mark.parametrize(
    "view,url_name,expected_status,expected_information",
    [
        (
            views.UserAccountView,
            "account",
            200,
            {
                "email": "cosme@fulanito.com",
                "first_name": "Cosme",
                "last_name": "Fulanito",
            },
        )
    ],
)
def test_retrieve_information_from_view(
    factory, cosme_credentials, view, url_name, expected_status, expected_information
):
    user = mixer.blend("user.User", **cosme_credentials)
    url = reverse(url_name)
    request = factory.get(url, format="json")
    force_authenticate(request, user)
    response = view.as_view()(request)
    assert response.status_code == expected_status
