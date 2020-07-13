from django.contrib import admin
from django.contrib.auth.models import Group

# from apps.challenge.models import Criterion, Challenge
from apps.exam.admin import ProblemAdmin, ExamAdmin
from apps.exam.models import Problem, Topic, Exam
from apps.user.models import User, Transaction

User.list_display = ("first_name", "last_name", "email", "is_active")

admin.site.register(User)
admin.site.register(Exam, ExamAdmin)
admin.site.register(Problem, ProblemAdmin)
# admin.site.register(Image)
admin.site.register(Topic)
# admin.site.register(Criterion)
# admin.site.register(Challenge)
# admin.site.register(Vote)
# admin.site.register(CurrentChallenge)
# admin.site.register(Transaction)
# admin.site.unregister(Group)
# Comment this for now
