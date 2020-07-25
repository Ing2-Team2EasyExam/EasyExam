import pytest
from mixer.backend.django import mixer
from apps.user.forms import UserAdminForm


@pytest.fixture
def cosme_fulanito_credentials():
    cosme_fulanito_serialized_data = {
        "email": "cosme@fulanito.com",
        "password": "Me da una copilla porfavor",
        "first_name": "Cosme",
        "last_name": "Fulanito",
        "groups": "",
        "is_active": True,
    }
    return cosme_fulanito_serialized_data


@pytest.mark.django_db
def test_user_admin_form_create(cosme_fulanito_credentials):
    form = UserAdminForm(cosme_fulanito_credentials)
    assert form.is_valid() is True
    cosme = form.save()
    assert cosme is not None
