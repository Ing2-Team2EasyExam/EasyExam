import os
import subprocess
from subprocess import PIPE

from uuid import uuid4

from django.http import JsonResponse
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    get_object_or_404,
    CreateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError
from sendfile import sendfile

from apps.api.models import get_random_object
from apps.exam.models import Topic, Exam, Problem
from apps.exam.permissions import IsUploader, IsAuthenticatedAndIsOwnerOrIsNone
from apps.exam.serializers import (
    TopicSerializer,
    ExamListSerializer,
    ExamDetailSerializer,
    ProblemSerializer,
    ProblemPDFSerializer,
    ProblemCreateSerializer,
    ExamCreateSerializer,
)
from apps.user.models import Transaction

from apps.exam.generate_exam.exceptions import CompilationErrorException
from django.conf import settings

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
    queryset = Problem.objects.all()


class UserProblemListView(ListAPIView):
    """
    Returns a list of problems uploaded by the user.
    """

    serializer_class = ProblemSerializer
    permission_classes = (IsAuthenticated, IsUploader)

    def get_queryset(self):
        return Problem.objects.filter(uploader=self.request.user)


class ProblemCreateView(CreateAPIView):
    """
    Creates a new Problem instance.
    """

    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProblemCreateSerializer
    permission_classes = (IsAuthenticated,)


class ProblemPDF(APIView):
    def get(self, request, uuid):
        problem = get_object_or_404(Problem, uuid=uuid)
        return sendfile(request, problem.pdf.path)


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


# Exam Views
class ExamList(ListAPIView):
    """
    Returns a list of all Exams owned by the user.
    """

    serializer_class = ExamListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Exam.objects.filter(owner=self.request.user)


class ExamDetail(RetrieveAPIView):
    """
    Returns the detail of an Exam, only the owner has access.
    """

    serializer_class = ExamDetailSerializer
    permission_classes = (IsAuthenticatedAndIsOwnerOrIsNone,)
    lookup_field = "uuid"
    queryset = Exam.objects.all()

    def get_object(self):
        """
        If an authenticated user accesses an exam created by an anonymous user,
        the exam becomes owned by the authenticated user.
        :return: Exam instance
        """
        exam = super().get_object()
        if self.request.user.is_authenticated and exam.owner is None:
            exam.owner = self.request.user
            if Exam.calculate_cost(exam.problems.all(), self.request.user) == 0:
                exam.is_paid = True
            exam.save()
        return exam


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


class ExamCreate(CreateAPIView):
    """
    Creates a new Exam instance.
    """

    serializer_class = ExamCreateSerializer


# TODO set dedicated nginx or Apache server for serving static files, check sendfile docs.


class ExamPDF(APIView):
    def get(self, request, uuid):
        exam = get_object_or_404(Exam, uuid=uuid)
        return sendfile(request, exam.pdf_normal.path)


class ExamPDFSolution(APIView):
    def get(self, request, uuid):
        exam = get_object_or_404(Exam, uuid=uuid, is_paid=True)
        return sendfile(request, exam.pdf_solution.path)


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


class PreviewLatexPDF(APIView):
    def get(self, request, uuid):
        uuid = str(uuid)
        pdf = os.path.join(settings.BASE_DIR, "previews", uuid + ".pdf")
        return sendfile(request, pdf)
