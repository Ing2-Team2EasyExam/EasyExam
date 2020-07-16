import pytest
from mixer.backend.django import mixer


@pytest.fixture
def user_factory():
    def _user_factory(email, password):
        user = mixer.blend("user.User", email=email)
        user.set_password(password)
        user.save()
        return user

    return _user_factory


@pytest.fixture
def credentials():
    user_data = {
        "email": "cosme@fulanito.com",
        "password": "Me da una copilla porfavor",
    }
    return user_data


@pytest.fixture
def cosme_fulanito(user_factory, credentials):
    return user_factory(**credentials)
