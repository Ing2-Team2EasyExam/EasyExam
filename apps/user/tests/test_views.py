from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.authtoken.models import Token
from django.shortcuts import reverse
from apps.user import views
<<<<<<< HEAD

from mixer.backend.django import mixer
import pytest
=======
from mixer.backend.django import mixer
>>>>>>> test(pytest): Revert migration to pytest of the tests


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
        "last_name": "Fulanito",
        "password": "Me da una copilla porfavor",
    }


@pytest.mark.django_db
@pytest.mark.parametrize(
    "expected_status,expected_information",
    [
        (
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
    factory, cosme_credentials, expected_status, expected_information
):
    user = mixer.blend("user.User", **cosme_credentials)
    url = reverse("account")
    request = factory.get(url, format="json")
    force_authenticate(request, user)
    response = views.UserAccountView.as_view()(request)
    assert response.status_code == expected_status
    assert response.data == expected_information


@pytest.mark.django_db
@pytest.mark.parametrize(
    "updated_data,expected_status,expected_information",
    [
        (
            {"first_name": "Homero", "last_name": "Tompson"},
            200,
            {
                "email": "cosme@fulanito.com",
                "first_name": "Homero",
                "last_name": "Tompson",
            },
        )
    ],
)
def test_update_account_information(
    factory, cosme_credentials, updated_data, expected_status, expected_information
):
    user = mixer.blend("user.User", **cosme_credentials)
    url = reverse("account")
    request = factory.put(url, data=updated_data, format="json")
    force_authenticate(request, user)
    response = views.UserAccountView.as_view()(request)
    assert response.status_code == expected_status
    assert response.data == expected_information


@pytest.mark.django_db
@pytest.mark.parametrize(
    "updated_credentials,expected_status,expected_information",
    [
        (
            {
                "old_password": "Me da una copilla porfavor",
                "new_password": "Homero? Quien es homero?",
            },
            200,
            {},
        ),
        (
            {
                "old_password": "Mi nombre es cosme fulanito",
                "new_password": "Este hombre es mi doble exacto",
            },
            400,
            {"old_password": ["Invalid password"]},
        ),
    ],
)
def test_change_password_view(
    factory,
    cosme_credentials,
    updated_credentials,
    expected_status,
    expected_information,
):
    user = mixer.blend("user.User", **cosme_credentials)
    user.set_password(cosme_credentials["password"])
    user.save()
    url = reverse("change-password")
    request = factory.put(url, data=updated_credentials, format="json")
    force_authenticate(request, user)
    response = views.ChangePasswordView.as_view()(request)
    assert response.status_code == expected_status
    assert response.data == expected_information

@pytest.fixture
def factory():
    return APIRequestFactory()


@pytest.fixture
def login_url():
    return reverse("login")


@pytest.fixture
def logout_url():
    return reverse("logout")


@pytest.mark.django_db
def test_login_request_no_data(factory, credentials, login_url):
    request = factory.post(login_url)
    response = views.LoginView.as_view()(request)
    assert response.status_code == 400
    assert response.data == {"error": "Please provide both username and password"}


@pytest.mark.django_db
def test_login_request_non_existant_user(factory, credentials, login_url):
    request = factory.post(login_url, data=credentials, format="json")
    response = views.LoginView.as_view()(request)
    assert response.status_code == 404
    assert response.data == {"error": "Invalid Credentials"}


@pytest.mark.django_db
def test_valid_login(factory, credentials, login_url, cosme_fulanito):
    request = factory.post(login_url, data=credentials, format="json")
    response = views.LoginView.as_view()(request)
    assert response.status_code == 200
    assert "token" in response.data
    assert response.data["token"] is not None


@pytest.mark.django_db
def test_non_authenticated_logout_request(factory, logout_url):
    request = factory.delete(logout_url)
    response = views.LogoutView.as_view()(request)
    assert response.status_code == 401


@pytest.mark.django_db
def test_authenticated_user_logout_request(factory, logout_url, cosme_fulanito):
    request = factory.delete(logout_url)
    Token.objects.create(user=cosme_fulanito)
    force_authenticate(request, cosme_fulanito)
    response = views.LogoutView.as_view()(request)
    assert response.status_code == 200
