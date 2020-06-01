from django.urls import path

from apps.exam.views import (
    TopicListView,
    ExamList,
    ExamDetail,
    ExamPay,
    ProblemListView,
    UserProblemListView,
    ProblemCreateView,
    ExamCreate,
    ExamPDF,
    ExamPDFSolution,
    ProblemRandom,
    ProblemPDF,
    PreviewLatex,
    PreviewLatexPDF,
)

urlpatterns = [
    # Topic paths
    path("topics/list/", TopicListView.as_view(), name="topics-list"),
    # Problems paths
    path("problems/create/", ProblemCreateView.as_view(), name="problem-create"),
    path(
        "problems/uploaded/list/",
        UserProblemListView.as_view(),
        name="user-problem-list",
    ),
    path("problems/list/", ProblemListView.as_view(), name="problem-list"),
    path("problems/random/", ProblemRandom.as_view(), name="problem-random"),
    path("problems/<uuid:uuid>/pdf/", ProblemPDF.as_view(), name="problem-pdf"),
    path("preview-latex/", PreviewLatex.as_view(), name="preview-latex"),
    path(
        "preview-latex/<uuid:uuid>/pdf/",
        PreviewLatexPDF.as_view(),
        name="preview-latex-pdf",
    ),
    # Exam paths
    path("exams/", ExamCreate.as_view(), name="exam-create"),
    path("exams/owned/", ExamList.as_view(), name="exam-list"),
    path("exams/<uuid:uuid>/", ExamDetail.as_view(), name="exam-detail"),
    path("exams/<uuid:uuid>/pay/", ExamPay.as_view(), name="exam-pay"),
    path("exams/<uuid:uuid>/pdf/", ExamPDF.as_view(), name="exam-pdf"),
    path(
        "exams/<uuid:uuid>/pdf-solution/",
        ExamPDFSolution.as_view(),
        name="exam-pdf-solution",
    ),
]
