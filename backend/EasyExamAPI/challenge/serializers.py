from rest_framework import serializers

from challenge.models import Vote, Criterion
from exam.serializers import ProblemDetailSerializer


class CriterionSerializer(serializers.ModelSerializer):
    """
    Serializer of the Criterion model, used for reading the detail of a criterion, includes the answer choices
    of the criterion. Used in AllChallengesSerializer.
    """
    answer_choices = serializers.SerializerMethodField(read_only=True)

    def get_answer_choices(self, obj):
        return Vote.ANSWER_CHOICES

    class Meta:
        model = Criterion
        fields = ('name', 'question', 'answer_choices',)


class AllChallengesSerializer(serializers.Serializer):
    """
    Serializer for all current challenges of a user. All current challenges use the same problem so
    it gives only one field of the problem.
    """
    criteria = CriterionSerializer(many=True)
    problem = ProblemDetailSerializer()


class VoteSerializer(serializers.ModelSerializer):
    """
    Serializer for the Vote model, used in AllVotesSerializer.
    """

    class Meta:
        model = Vote
        fields = ('challenge', 'answer', 'user',)
        extra_kwargs = {
            'challenge': {
                'read_only': True,
            },
            'answer': {
                'read_only': True,
            },
            'user': {
                'read_only': True,
            },
        }


class AllVotesSerializer(serializers.Serializer):
    """
    Serializer for all the votes corresponding to the current challenges.
    """
    votes = VoteSerializer(many=True, write_only=True)
    credits = serializers.SerializerMethodField()

    def get_credits(self, instance):
        credits = 0
        for v in instance['votes']:
            credits += v.calculate_obtained_credits()
        return credits
