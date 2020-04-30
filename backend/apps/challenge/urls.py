from django.urls import path

from apps.challenge.views import AllChallengesView, AllChallengesVotes

urlpatterns = [
    path(
        "current-challenge/vote/",
        AllChallengesVotes.as_view(),
        name="all-challenges-votes",
    ),
    path("current-challenge/", AllChallengesView.as_view(), name="all-challenges"),
]
