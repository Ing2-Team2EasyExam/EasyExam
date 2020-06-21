from django.urls import path

from apps.exam.views import (
    TopicListView,
    ExamListView,
    ProblemListView,
    UserProblemListView,
    ProblemCreateView,
    ProblemUpdateView,
    ExamCreateView,
    ExamUpdateView,
    ExamDeleteView,
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
    path(
        "problems/<uuid:uuid>/update/",
        ProblemUpdateView.as_view(),
        name="problem-update",
    ),
    # Exam paths
    path("exams/create/", ExamCreateView.as_view(), name="exam-create"),
    path("exams/lists/", ExamListView.as_view(), name="exam-list"),
    path("exams/<uuid:uuid>/update/", ExamUpdateView.as_view(), name="exam-update"),
    path("exams/<uuid:uuid>/delete/", ExamDeleteView.as_view(), name="exam-delete"),
]
