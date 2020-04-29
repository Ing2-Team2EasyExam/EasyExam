from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import get_random_object
from challenge.models import CurrentChallenge, Criterion, Challenge, Vote
from challenge.serializers import AllChallengesSerializer, AllVotesSerializer
from exam.models import Problem
from user.models import Transaction


class AllChallengesView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_problem(self):
        return get_random_object(Problem.objects.all())

    def generate_challenges(self):
        challenges = []
        p = self.get_problem()
        for c in Criterion.objects.all():
            challenge = Challenge.objects.get_or_create(problem=p, criterion=c)[0]
            cc = CurrentChallenge.objects.create(user=self.request.user, challenge=challenge)
            challenges.append(cc)
        return challenges

    def get(self, request):
        challenges = CurrentChallenge.objects.filter(user=self.request.user).order_by('pk')
        if len(challenges) == 0:
            challenges = self.generate_challenges()
        problem = challenges[0].challenge.problem
        criteria = []
        for c in challenges:
            criteria.append(c.challenge.criterion)
        return Response(
            AllChallengesSerializer({'problem': problem, 'criteria': criteria}, context={'request': request}).data)


class AllChallengesVotes(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        challenges = CurrentChallenge.objects.filter(user=self.request.user).order_by('pk')
        answers = request.data['answers']

        if len(challenges) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'No current challenges available.'})

        if len(answers) != len(challenges):
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Wrong number of votes'})

        votes = []
        for i in range(len(challenges)):
            if answers[i] == 'V' or answers[i] == 'I':
                votes.append(
                    Vote.objects.create(user=self.request.user, answer=answers[i], challenge=challenges[i].challenge))

        data = AllVotesSerializer({'votes': votes}).data

        for c in challenges:
            c.delete()

        description = 'Gained {credits} credits for completing a challenge.'.format(credits=data['credits'])
        Transaction.objects.create(user=self.request.user, change=data['credits'], description=description)

        return Response(data)
