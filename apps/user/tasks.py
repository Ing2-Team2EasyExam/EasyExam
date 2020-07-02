from EasyExamAPI.celery import app
from django.template import Context
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.conf import settings
from .models import User


@app.task
def send_reset_password_email(email: str, reset_token: str) -> int:
    email_subject = "[EasyExam] Reset password"
    context = Context(
        {"reset_url": "".join(settings.SERVER_URL, "/reset_password/", reset_token)}
    )
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
