from django.template import Context
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.conf import settings
from .models import User
from celery import shared_task


@shared_task
def send_reset_password_email(email: str, reset_token: str) -> int:
    email_subject = "[EasyExam] Reset password"
    context = {
        "reset_url": "".join([settings.SERVER_URL, "/reset_password/", reset_token])
    }
    html_message = render_to_string("emails/reset_password_email.html", context)
    user_email = [email]
    server_email = "easyexam@noreply.com"
    return send_mail(
        subject=email_subject,
        message="",
        from_email=server_email,
        recipient_list=user_email,
        html_message=html_message,
    )


@shared_task
def send_activation_email(email: str, activation_token: str, password: str) -> int:
    email_subject = "[EasyExam] Activate your account"
    context = {
        "reset_url": "".join(
            [settings.SERVER_URL, "/activate_account/", activation_token]
        ),
        "password": password,
    }
    html_message = render_to_string("emails/activate_account.html", context)
    user_email = [email]
    server_email = settings.SERVER_EMAIL
    return send_email(
        subject=email_subject,
        message="",
        from_email=server_email,
        recipient_list=user_email,
        html_message=html_message,
    )
