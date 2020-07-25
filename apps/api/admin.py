from django.contrib import admin
from django.contrib.auth.models import Group
from apps.exam.admin import ProblemAdmin, ExamAdmin
from apps.exam.models import Problem, Topic, Exam
from apps.user.models import User, Transaction
from apps.user.forms import UserAdminForm

# Site Header

admin.site.site_header = "EasyExam Admin"

# Admin class

# Fields For User Creation And Edit
# User E-mail
# Check if User Is Active
# Avatar / Profile Picture
# Password
# User Group
# User Permissions TODO check differences between is_staff y is_superuser, if staff user can enter to the Django Admin Interface
# I'ts the same as the is_admin field on Our Model


class UserAdmin(admin.ModelAdmin):
    form = UserAdminForm
    fieldsets = [
        ("Correo Electrónico ", {"fields": ["email"]}),
        ("Contraseña", {"fields": ["password"]}),
        ("Nombre Completo", {"fields": ["first_name", "last_name"]}),
        ("Foto De Perfil", {"fields": ["image"]}),
        ("Grupos", {"fields": ["groups"]}),
        ("Usuario Activo", {"fields": ["is_active"]}),
    ]


# Admin class register with his asociated model
admin.site.register(User, UserAdmin)

# Problem class register with his asociated model
admin.site.register(Exam, ExamAdmin)
admin.site.register(Problem, ProblemAdmin)

# Topic class register with his asociated model
admin.site.register(Topic)
