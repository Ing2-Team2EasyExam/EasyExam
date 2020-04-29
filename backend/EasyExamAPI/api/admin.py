from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from challenge.models import Criterion, Challenge
from exam.admin import ProblemAdmin, ExamAdmin
from exam.models import Problem, Topic, Exam
from user.models import User, Transaction

UserAdmin.list_display = ('username', 'email', 'credits',)
UserAdmin.list_filter += ('credits',)
UserAdmin.fieldsets += (('credits', {'fields': ('credits',)}),)

admin.site.register(User, UserAdmin)
admin.site.register(Exam, ExamAdmin)
admin.site.register(Problem, ProblemAdmin)
# admin.site.register(Image)
admin.site.register(Topic)
admin.site.register(Criterion)
admin.site.register(Challenge)
# admin.site.register(Vote)
# admin.site.register(CurrentChallenge)
admin.site.register(Transaction)
admin.site.unregister(Group)
