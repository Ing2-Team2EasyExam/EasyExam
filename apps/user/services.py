import secrets
import string
from django.conf import settings
from rest_framework.authtoken.models import Token
from apps.user.models import User
from django.utils.crypto import salted_hmac, constant_time_compare
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_str, force_bytes
from typing import Dict, Optional, Callable
from django.urls import reverse
from datetime import date


def create_token_factory(secret: str, salt: str) -> Callable[[], str]:
    def create_token(*data) -> str:
        message = "".join(data)
        return salted_hmac(key_salt=salt, value=message, secret=secret).hexdigest()[::5]

    return create_token


reset_password_signature = create_token_factory(
    settings.RESET_PASSWORD_SECRET, "reset_password"
)


def get_days(some_date: date) -> int:
    unix_epoch = date(1970, 1, 1)
    return (some_date - unix_epoch).days


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


def validate_token(
    user_email_b64: str, user_updated_at_b64: str, created_time_b64: str, signature: str
) -> bool:
    today = get_days(date.today())
    created_time = int(urlsafe_base64_decode(created_time_b64).decode())
    user_email = urlsafe_base64_decode(user_email_b64).decode()
    user_updated_at = urlsafe_base64_decode(user_updated_at_b64).decode()
    if not User.objects.filter(email=user_email).exists():
        return False

    if today - created_time < settings.RESET_PASSWORD_TTL_DAYS:
        if (
            constant_time_compare(
                signature,
                reset_password_signature(
                    user_email, user_updated_at, force_str(created_time)
                ),
            )
            is True
        ):
            return True
    return False


def create_user_reset_password_url(user: User) -> str:
    updated_at = force_str(user.updated_at)
    link_created = get_days(date.today())
    created_time_b64 = urlsafe_base64_encode(force_bytes(link_created))
    email_b64 = urlsafe_base64_encode(force_bytes(user.email))
    updated_at_b64 = urlsafe_base64_encode(force_bytes(updated_at))
    token = reset_password_signature(user.email, updated_at, force_str(link_created))
    url_kwargs = {
        "email_b64": email_b64,
        "updated_at_b64": updated_at_b64,
        "created_time_b64": created_time_b64,
        "signature": token,
    }
    return reverse("reset-password-form", kwargs=url_kwargs)


def get_user_from_email(email: str) -> User:
    return User.objects.get(email=email)


def get_user_from_email_b64(email_b64: str) -> User:
    email = urlsafe_base64_decode(email_b64).decode()
    return get_user_from_email(email)
