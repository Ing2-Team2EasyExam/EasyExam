from rest_framework.authtoken.models import Token
from apps.user.models import User


def generate_access_token(user: User) -> Token:
    token, _ = Token.objects.get_or_create(user=user)
    return token


def revoke_access_token(user: User) -> None:
    token = Token.objects.get(user=user)
    token.delete()
