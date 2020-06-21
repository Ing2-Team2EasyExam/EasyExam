from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.reverse import reverse
from django.http import Http404
from apps.exam.models import Topic, Exam, Problem, Image, ExamProblemChoice

from apps.exam.generate_exam.exceptions import CompilationErrorException
from apps.exam.services import (
    get_problem_topics,
    get_exam_topics,
    get_problems_from_serializers,
    create_exam,
    update_exam,
    create_problem,
    update_problem,
    check_problem_is_used,
)


class TopicSerializer(serializers.ModelSerializer):
    """
    Serializer of the Topic model
    """

    class Meta:
        model = Topic
        fields = ("name",)


class ProblemSerializer(serializers.ModelSerializer):
    """
    Serializer of the Problem model, used for reading a simplified view of a problem best used when
    serializing a list of problems.
    """

    topics = TopicSerializer(many=True)
    editable = serializers.SerializerMethodField()

    class Meta:
        model = Problem
        fields = ("uuid", "name", "author", "created_at", "topics", "editable")
        read_only_fields = (
            "uuid",
            "name",
            "author",
            "created_at",
            "topics",
            "editable",
        )

    def get_editable(self, instance):
        return not check_problem_is_used(instance)


class ProblemPDFSerializer(serializers.ModelSerializer):
    """
    Serializer of the Problem model, used for reading a detailed view of a problem.
    """

    topics = TopicSerializer(many=True)
    pdf = serializers.SerializerMethodField()

    def get_pdf(self, instance):
        return reverse("problem-pdf", kwargs={"uuid": instance.uuid})

    class Meta:
        model = Problem
        fields = ("pdf",)


class ProblemEditSerializer(serializers.ModelSerializer):
    """
    Serializer of the Problem model, used for creating a problem instance.
    topics_data is a list of strings corresponding to the topics of the problem.
    figures is a list of images, corresponding to the figures used in the latex file.
    """

    topics_data = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=True
    )
    figures = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Problem
        fields = (
            "uuid",
            "name",
            "author",
            "statement_content",
            "solution_content",
            "topics_data",
            "figures",
        )
        read_only_fields = ("uuid",)

    def validate_topics_data(self, obj):
        if len(obj) == 0:
            raise ValidationError("topics_data should not be empty")
        return obj

    def update(self, instance, validated_data):
        if check_problem_is_used(instance):
            raise ValidationError("Problem is not editable")
        return update_problem(instance.pk, **validated_data)

    def create(self, validated_data):
        """
        On creation, sets the topics to the problem instance, if the topic is not in the database it's created.
        Creates the images and associates them to the problem instance.
        Generates the problem pdf, if there is an error in the latex compilation the problem instance is deleted.
        :param validated_data: problem data
        :return: Created problem
        """
        return create_problem(uploader=self.context["request"].user, **validated_data)


class ProblemUpdateSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True)

    class Meta:
        model = Problem
        fields = (
            "uuid",
            "name",
            "author",
            "statement_content",
            "solution_content",
            "topics",
        )


class ExamListSerializer(serializers.ModelSerializer):
    """
    Serializer of the Exam model, used for reading a simplified view of an exam best used when
    serializing a list of exams.
    """

    class Meta:
        model = Exam
        fields = ("uuid", "name", "updated_at")


class ProblemNestedSerializer(serializers.ModelSerializer):
    """
    Serializer for the edition of exams, to add the corresponding problems to it
    """

    class Meta:
        model = Problem
        fields = ("name", "author")
        validators = []

    # TODO: Write custom exception for this cases
    def create(self, validated_data):
        raise ValidationError("Can't write on this serializer")

    def update(self, instance, validated_data):
        raise ValidationError("Can't write on this serializer")


class ExamProblemChoiceSerializer(serializers.ModelSerializer):
    problem = ProblemNestedSerializer()

    class Meta:
        model = ExamProblemChoice
        fields = ("points", "problem")


class ExamEditSerializer(serializers.ModelSerializer):
    """
    Serializer of the Exam model, used for creating an exam instance.
    problems is a list of uuids corresponding to the uuids of the problems to use
    """

    problems = ProblemNestedSerializer(many=True)

    class Meta:
        model = Exam
        fields = (
            "uuid",
            "name",
            "teacher",
            "university",
            "course_name",
            "course_code",
            "language",
            "problems",
            "due_date",
            "start_time",
            "end_time",
        )
        read_only_fields = ("uuid",)

    def update(self, instance, validated_data):
        serialized_problems = validated_data.pop("problems")
        try:
            problems = get_problems_from_serializers(serialized_problems)
            user = instance.owner
            exam = update_exam(
                uuid=instance.pk, **validated_data, owner=user, problems=problems
            )
            return exam
        except Problem.DoesNotExist:
            raise Http404()

    def create(self, validated_data):
        """
        On creation associates the problems to the exam. If there's an error on the latex compilation
        the exam instance is deleted. If the cost of the exam is 0 the exam's solution is unlocked.
        :param validated_data: exam data
        :return: Created exam
        """
        serialized_problems = validated_data.pop("problems")
        try:
            problems = get_problems_from_serializers(serialized_problems)
            user = self.context["request"].user
            exam = create_exam(**validated_data, owner=user, problems=problems)
            return exam
        except Problem.DoesNotExist:
            raise Http404()


class ExamDetailSerializer(object):
    pass


class ExamCreateSerializer(object):
    pass
