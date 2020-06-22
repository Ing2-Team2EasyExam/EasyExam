from math import floor

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

from apps.exam.models import Problem
from apps.user.models import Transaction

User = get_user_model()


class Criterion(models.Model):
    question = models.CharField(max_length=300)
    name = models.CharField(max_length=100, unique=True)
    tolerance = models.FloatField(default=settings.CRITERION_TOLERANCE)
    quorum = models.IntegerField(default=settings.CRITERION_QUORUM)
    value = models.IntegerField(default=settings.CRITERION_VALUE)

    class Meta:
        verbose_name_plural = "Criteria"

    def __str__(self):
        return self.name


class Challenge(models.Model):
    STATE_CHOICES = (("V", "Valid"), ("I", "Invalid"), ("N", "Neutral"))

    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    criterion = models.ForeignKey(Criterion, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    state = models.CharField(choices=STATE_CHOICES, default="N", max_length=1)
    vote_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ("problem", "criterion")

    def save(self, *args, **kwargs):
        self.state = self.recalculate_state()
        if self.state == "V" and self.problem.validated == False:
            self.validate_problem()
        return super(Challenge, self).save(*args, **kwargs)

    def recalculate_state(self):
        if self.state == "V":
            return "V"
        state = ""
        if self.vote_count < self.criterion.quorum:
            state = "N"
        else:
            if self.score / self.vote_count >= self.criterion.tolerance:
                state = "V"
            else:
                state = "I"
        return state

    def validate_problem(self):
        # TODO send email to user about their problem getting validated
        self.problem.validated = True
        self.problem.save()

        description = "Gained {credits} for having an uploaded problem validated.".format(
            credits=self.criterion.value * 3
        )
        Transaction.objects.create(
            user=self.problem.uploader,
            change=self.criterion.value * 3,
            description=description,
        )

        for t in self.problem.topics.all():
            t.hidden = False
            t.save()

    def __str__(self):
        return str(self.problem) + " - " + str(self.criterion)


class Vote(models.Model):
    ANSWER_CHOICES = (("V", "Valid"), ("I", "Invalid"))

    answer = models.CharField(choices=ANSWER_CHOICES, max_length=1)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)

    def save(self, *args, **kwargs):
        super(Vote, self).save(*args, **kwargs)
        self.challenge.score += 1 if self.answer == "V" else 0
        self.challenge.vote_count += 1
        self.challenge.save()
        self.challenge.criterion.save()

    def calculate_obtained_credits(self):
        if self.challenge.vote_count < self.challenge.criterion.quorum:
            return floor(self.challenge.criterion.value / 2)
        else:
            if self.challenge.state == self.answer:
                return self.challenge.criterion.value
            else:
                return 0


class CurrentChallenge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "challenge")
