from django.urls import path

from apps.exam.views import (
    TopicListView,
    ExamListView,
    ExamDetail,
    ExamPay,
    ProblemListView,
    UserProblemListView,
    ProblemCreateView,
    ExamCreateView,
    ExamUpdateView,
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
    path("problems/<uuid:uuid>/pdf/", ProblemPDF.as_view(), name="problem-pdf"),
    path("preview-latex/", PreviewLatex.as_view(), name="preview-latex"),
    path(
        "preview-latex/<uuid:uuid>/pdf/",
        PreviewLatexPDF.as_view(),
        name="preview-latex-pdf",
    ),
    # Exam paths
    path("exams/create/", ExamCreateView.as_view(), name="exam-create"),
    path("exams/lists/", ExamListView.as_view(), name="exam-list"),
    path("exams/<uuid:uuid>/update/", ExamUpdateView.as_view(), name="exam-update"),
]
