from django.contrib import admin
from django.contrib.auth.models import Group
from apps.exam.admin import ProblemAdmin, ExamAdmin
from apps.exam.models import Problem, Topic, Exam
from apps.user.models import User, Transaction

# Site Header

admin.site.site_header = "EasyExam Admin"

# Definimos la clase admin

# Campos para creación y edición de un usuario
# Correo electronico
# Usuario activo
# Avatar / Foto de perfil
# Contraseña
# Grupo de Usuario
# Permisos TODO ver diferencias entre is_staff y is_superuser, si es staff puede entrar al admin de django, es equivalente
# al campo is_admin del modelo de datos


class UserAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Correo Electrónico ", {"fields": ["email"]}),
        ("Contraseña", {"fields": ["password"]}),
        ("Nombre Completo", {"fields": ["first_name", "last_name"]}),
        ("Foto De Perfil", {"fields": ["image"]}),
        ("Grupos", {"fields": ["groups"]}),
        ("Usuario Activo", {"fields": ["is_active"]}),
    ]


# Registramos la clase admin con su modelo asociado
admin.site.register(User, UserAdmin)

# Registramos la clase problema con su modelo asociado
admin.site.register(Exam, ExamAdmin)
admin.site.register(Problem, ProblemAdmin)

# Registramos la clase Topicos
admin.site.register(Topic)
