import secrets
import string
from rest_framework.authtoken.models import Token
from apps.user.models import User


def generate_access_token(user: User) -> Token:
    token, _ = Token.objects.get_or_create(user=user)
    return token


def revoke_access_token(user: User) -> None:
    token = Token.objects.get(user=user)
    token.delete()


def create_inactive_user_from_email(email: str, **extra_data) -> User:
    if "is_active" in extra_data:
        raise ValueError("Can't use the is_active param on this function")
    if "password" in extra_data:
        raise ValueError("Can't use the password param on this function")
    alphabet = string.ascii_letters + string.digits
    password = "".join(secrets.choice(alphabet) for i in range(15))
    new_user = User.objects.create_user(
        email=email, password=password, is_active=False, **extra_data
    )
    return new_user


def create_active_user_from_email(email: str, **extra_data) -> User:
    created_user = create_inactive_user_from_email(email, **extra_data)
    created_user.is_active = True
    created_user.save()
    return created_user
