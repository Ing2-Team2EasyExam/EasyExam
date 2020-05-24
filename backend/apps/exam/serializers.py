from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.reverse import reverse

from apps.exam.models import Topic, Exam, Problem, Image

from apps.exam.generate_exam.exceptions import CompilationErrorException
from apps.exam.services import get_problem_topics, get_exam_topics


class TopicSerializer(serializers.ModelSerializer):
    """
    Serializer of the Topic model
    """

    class Meta:
        model = Topic
        fields = ("name",)


class ProblemListSerializer(serializers.ModelSerializer):
    """
    Serializer of the Problem model, used for reading a simplified view of a problem best used when
    serializing a list of problems.
    """

    topics = TopicSerializer(many=True)

    class Meta:
        model = Problem
        fields = ("name", "author", "created_at", "topics")


class ProblemDetailSerializer(serializers.ModelSerializer):
    """
    Serializer of the Problem model, used for reading a detailed view of a problem.
    """

    topics = TopicSerializer(many=True)
    pdf = serializers.SerializerMethodField()

    def get_pdf(self, instance):
        return reverse("problem-pdf", kwargs={"uuid": instance.uuid})

    class Meta:
        model = Problem
        fields = ("uuid", "name", "author", "topics", "pdf")


class ProblemCreateSerializer(serializers.ModelSerializer):
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
    topics = TopicSerializer(many=True, source="topics.all", read_only=True)

    class Meta:
        model = Problem
        fields = (
            "uuid",
            "name",
            "author",
            "content",
            "topics",
            "topics_data",
            "figures",
        )
        extra_kwargs = {"uuid": {"read_only": True}}

    def validate_topics_data(self, obj):
        if len(obj) == 0:
            raise ValidationError("topics_data should not be empty")
        return obj

    def create(self, validated_data):
        """
        On creation, sets the topics to the problem instance, if the topic is not in the database it's created.
        Creates the images and associates them to the problem instance.
        Generates the problem pdf, if there is an error in the latex compilation the problem instance is deleted.
        :param validated_data: problem data
        :return: Created problem
        """
        topics_data = validated_data.get("topics_data", None)
        figures = validated_data.get("figures", None)
        problem = Problem(**validated_data, uploader=self.context["request"].user)
        problem.save()
        topics = []
        for t in topics_data:
            topic, _ = Topic.objects.get_or_create(name=t)
            topics.append(topic.pk)
        problem.topics.set(topics)
        if figures is not None:
            for f in figures:
                Image.objects.create(image=f, problem=problem, name=f.name)
        problem.save()
        problem.generate_pdf()
        return problem


class ExamListSerializer(serializers.ModelSerializer):
    """
    Serializer of the Exam model, used for reading a simplified view of an exam best used when
    serializing a list of exams.
    """

    class Meta:
        model = Exam
        fields = ("uuid", "name", "date", "is_paid")


class ExamDetailSerializer(serializers.ModelSerializer):
    """
    Serializer of the Exam model, used for reading a detailed view of an exam.
    """

    topics = serializers.SerializerMethodField()
    cost = serializers.SerializerMethodField()
    pdf_normal = serializers.SerializerMethodField()
    pdf_solution = serializers.SerializerMethodField()

    def get_topics(self, instance):
        return get_exam_topics(instance)

    def get_cost(self, instance):
        return Exam.calculate_cost(
            instance.problems.all(), self.context["request"].user
        )

    def get_pdf_normal(self, instance):
        return reverse("exam-pdf", kwargs={"uuid": instance.uuid})

    def get_pdf_solution(self, instance):
        return reverse("exam-pdf-solution", kwargs={"uuid": instance.uuid})

    class Meta:
        model = Exam
        fields = (
            "uuid",
            "name",
            "university",
            "teacher",
            "course",
            "course_code",
            "is_paid",
            "date",
            "start_time",
            "end_time",
            "topics",
            "pdf_normal",
            "pdf_solution",
            "problems",
            "cost",
        )


class ExamCreateSerializer(serializers.ModelSerializer):
    """
    Serializer of the Exam model, used for creating an exam instance.
    problems is a list of uuids corresponding to the uuids of the problems to use
    """

    problems = serializers.SlugRelatedField(
        many=True, slug_field="uuid", queryset=Problem.objects.all()
    )
    url = serializers.SerializerMethodField()

    def get_url(self, instance):
        return reverse("exam-detail", kwargs={"uuid": instance.uuid})

    class Meta:
        model = Exam
        fields = (
            "uuid",
            "name",
            "university",
            "teacher",
            "course",
            "course_code",
            "date",
            "start_time",
            "end_time",
            "problems",
            "url",
        )
        extra_kwargs = {"uuid": {"read_only": True}}

    def create(self, validated_data):
        """
        On creation associates the problems to the exam. If there's an error on the latex compilation
        the exam instance is deleted. If the cost of the exam is 0 the exam's solution is unlocked.
        :param validated_data: exam data
        :return: Created exam
        """
        problem_data = validated_data.pop("problems")
        user = self.context["request"].user
        if not user.is_authenticated:
            user = None
        exam = Exam.objects.create(**validated_data, owner=user)

        exam.problems.set(problem_data)
        exam.save()

        try:
            exam.generate_pdf()
        except CompilationErrorException as err:
            exam.delete()
            raise ValidationError(err.latex_logs)
        except Exception:
            exam.delete()
            raise ValidationError(
                "There was an internal error in the compilation of the latex file"
            )

        cost = Exam.calculate_cost(problem_data, self.context["request"].user)

        if cost == 0:
            exam.is_paid = True
            exam.save()

        return exam
