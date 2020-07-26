import os
import subprocess
from subprocess import PIPE

from uuid import uuid4

from django.http import JsonResponse, FileResponse
from rest_framework import status
from rest_framework.mixins import DestroyModelMixin
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    get_object_or_404,
    CreateAPIView,
    UpdateAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError
from sendfile import sendfile

from apps.api.models import get_random_object
from apps.exam.models import Topic, Exam, Problem
from apps.exam.permissions import IsUploader, IsOwner
from apps.exam.serializers import (
    TopicSerializer,
    ExamListSerializer,
    ExamDetailSerializer,
    ProblemSerializer,
    ProblemPDFSerializer,
    ProblemEditSerializer,
    ProblemUpdateSerializer,
    ExamEditSerializer,
)
from apps.user.models import Transaction

from apps.exam.generate_exam.exceptions import CompilationErrorException
from django.conf import settings
from .services import recompile_exam, recompile_problem, get_problem, clone_problem
from .generate_exam.exceptions import CompilationErrorException


class ProblemErrorHandlerMixin(object):
    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except CompilationErrorException as err:
            data = {"error": err.latex_logs}
            return Response(data=data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NoSerializerInformationMixin(object):
    lookup_field = None
    model = None

    def get_lookup_field(self, *args, **kwargs):
        if self.lookup_field is None:
            raise LookupError("No lookup field declared")
        return self.lookup_field

    def get_object_class(self, *args, **kwargs):
        if self.model is None:
            raise LookupError("No model is defined")
        return self.model

    def get_object(self, *args, **kwargs):
        lookup_field = self.get_lookup_field(*args, **kwargs)
        model = self.get_object_class(*args, **kwargs)
        filter_kwargs = {lookup_field: self.kwargs[lookup_field]}
        return get_object_or_404(model, **filter_kwargs)


class RetrieveFileMixin(NoSerializerInformationMixin):
    file_attribute_name = None
    as_attachment = False
    filename = None

    def get_filename(self, *args, **kwargs):
        if filename is None:
            return ""
        return filename

    def get_file_attribute_name(self, *args, **kwargs):
        if self.file_attribute_name is None:
            raise LookupError("Didn't defined file attribute name")
        obj = self.get_object(*args, **kwargs)
        return getattr(obj, self.file_attribute_name)

    def retrieve(self, *args, **kwargs):
        obj_file = self.get_file_attribute_name(*args, **kwargs)
        filename = self.get_filename(*args, **kwargs)
        return FileResponse(
            obj_file, as_attachment=self.as_attachment, filename=filename
        )


# Topic Views
class TopicListView(ListAPIView):
    """
    Returns a list of all non hidden Topics.
    """

    serializer_class = TopicSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Topic.objects.all()


# Problem views
class ProblemListView(ListAPIView):
    """
    List all the problems on the system
    """

    serializer_class = ProblemSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Problem.objects.all().order_by("-created_at")


class UserProblemListView(ListAPIView):
    """
    Returns a list of problems uploaded by the user.
    """

    serializer_class = ProblemSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Problem.objects.filter(uploader=self.request.user)


class ProblemCreateView(ProblemErrorHandlerMixin, CreateAPIView):
    """
    Creates a new Problem instance.
    """

    # parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProblemEditSerializer
    permission_classes = (IsAuthenticated,)


class ProblemUpdateView(ProblemErrorHandlerMixin, RetrieveUpdateAPIView):
    serializer_class = ProblemEditSerializer
    permission_classes = (IsAuthenticated,)
    lookup_field = "uuid"

    def get(self, request, *args, **kwargs):
        self.serializer_class = ProblemUpdateSerializer
        return super().get(request, *args, **kwargs)

    def get_object(self, *args, **kwargs):
        return get_object_or_404(
            Problem, pk=self.kwargs[self.lookup_field], uploader=self.request.user
        )


class ProblemPDFView(RetrieveFileMixin, APIView):
    permission_classes = (IsAuthenticated,)
    lookup_field = "uuid"
    model = Problem
    file_attribute_name = "pdf"
    as_attachment = True

    def get_object(self, *args, **kwargs):
        problem = super().get_object(*args, **kwargs)
        recompile_problem(problem)  # TODO: Delete this when uploading to buho
        return problem

    def get_filename(self, *args, **kwargs):
        problem = self.get_object(*args, **kwargs)
        return f"{problem.name}_{problem.author}.pdf"

    def get(self, request, uuid, *args, **kwargs):
        return super().retrieve(request, uuid, *args, **kwargs)


class ProblemPDFExamView(RetrieveFileMixin, APIView):
    permission_classes = (IsAuthenticated,)
    model = Problem
    file_attribute_name = "pdf"
    as_attachment = True

    def get_object(self, *args, **kwargs):
        name = self.kwargs["name"]
        author = self.kwargs["author"]
        model = self.get_object_class(*args, **kwargs)
        problem = get_object_or_404(model, name=name, author=author)
        recompile_problem(problem)
        return problem

    def get_filename(self, *args, **kwargs):
        problem = self.get_object(*args, **kwargs)
        return f"{problem.name}_{problem.author}.pdf"

    def get(self, request, name, author, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class ProblemCloneView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            problem_id = self.request.data["uuid"]
            problem = get_problem(problem_id)
            cloned_problem = clone_problem(problem, self.request.user)
            response_data = {"uuid": cloned_problem.uuid}
            return Response(data=response_data, status=status.HTTP_201_CREATED)
        except KeyError:
            response_data = {"uuid": "Original problem uuid required"}
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)


# Exam Views
class ExamListView(ListAPIView):
    """
    Returns a list of all Exams owned by the user.
    """

    serializer_class = ExamListSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Exam.objects.filter(owner=self.request.user)


class ExamCreateView(CreateAPIView):
    """
    Creates a new Exam instance.
    """

    serializer_class = ExamEditSerializer
    permission_classes = (IsAuthenticated,)


class ExamUpdateView(RetrieveUpdateAPIView):
    """
    Update a existant Exam instance
    """

    serializer_class = ExamEditSerializer
    permission_classes = (IsAuthenticated, IsOwner)
    lookup_field = "uuid"

    def get_object(self, *args, **kwargs):
        return Exam.objects.get(pk=self.kwargs[self.lookup_field])


class ExamDeleteView(DestroyModelMixin, NoSerializerInformationMixin, APIView):
    permission_classes = (IsAuthenticated, IsOwner)
    lookup_field = "uuid"
    model = Exam

    def delete(self, *args, **kwargs):
        return super().destroy(self.request, *args, **kwargs)


# PDF Stuff


class ExamNormalPDFDownloadView(RetrieveFileMixin, APIView):
    permission_classes = (IsAuthenticated, IsOwner)
    lookup_field = "uuid"
    model = Exam
    file_attribute_name = "pdf_normal"
    as_attachment = True

    def get_filename(self, *args, **kwargs):
        exam = self.get_object(*args, **kwargs)
        return f"{exam.name}.pdf"

    def get(self, request, uuid, *args, **kwargs):
        return super().retrieve(request, uuid, *args, **kwargs)


class ExamSolutionPDFDownloadView(RetrieveFileMixin, APIView):
    permission_classes = (IsAuthenticated, IsOwner)
    lookup_field = "uuid"
    model = Exam
    file_attribute_name = "pdf_solution"
    as_attachment = True

    def get_filename(self, *args, **kwargs):
        exam = self.get_object(*args, **kwargs)
        return f"{exam.name}_solution.pdf"

    def get(self, request, uuid, *args, **kwargs):
        return super().retrieve(request, uuid, *args, **kwargs)


############# Legacy endpoints that are not being used :)
class PreviewLatex(APIView):
    def post(self, request):
        value = request.data.get("value", None)
        latex = (
            "\\documentclass{article}\n"
            "\\usepackage[utf8]{inputenc}\n"
            "\\usepackage{amsmath,amssymb,amsfonts,amsthm}\n"
            "\\usepackage{float,graphicx}\n"
            "\\begin{document}\n" + value + "\\end{document}\n"
        )
        uuid = str(uuid4())
        tex = os.path.join(settings.BASE_DIR, "previews", uuid + ".tex")
        with open(tex, "w+") as f:
            f.write(latex)
        with open(os.devnull, "w") as nul:
            result = subprocess.run(
                [os.path.join(settings.SCRIPT_DIR, "preview.pl"), tex],
                cwd=os.path.join(settings.BASE_DIR, "previews"),
                stdout=PIPE,
                stderr=nul,
            )
            if result.returncode != 0:
                latex_logs = result.stdout.decode("utf-8")
                raise ValidationError(latex_logs)
        url = "/api/preview-latex/" + uuid + "/pdf/"
        return JsonResponse({"url": url})


class ExamPay(APIView):
    """
    Pay to unlock the solutions of an Exam with the user's credits.
    """

    permission_classes = (IsAuthenticated,)

    def post(self, request, uuid):
        # TODO check case registrated user paying for a None owner exam
        exam = get_object_or_404(Exam, uuid=uuid)
        if exam.owner is None:
            exam.owner = request.user
            exam.save()
        cost = Exam.calculate_cost(exam.problems.all(), self.request.user)
        if request.user.credits < cost:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        Transaction.objects.create(user=request.user, change=-cost)
        exam.is_paid = True
        exam.save()
        return Response(status=status.HTTP_200_OK)


class ProblemRandom(APIView):
    def post(self, request):
        problem = None
        topics = request.data.get("topics", [])
        exclude = request.data.get("exclude", [])
        if len(topics) != 0:
            problem = get_random_object(
                Problem.objects.filter(topics__in=topics, validated=True).exclude(
                    uuid__in=exclude
                )
            )
        else:
            problem = get_random_object(
                Problem.objects.filter(validated=True).exclude(uuid__in=exclude)
            )
        if problem is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProblemSerializer(problem, context={"request": request})
        return Response(serializer.data)
