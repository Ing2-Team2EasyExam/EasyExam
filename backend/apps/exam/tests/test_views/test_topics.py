from django.test import TestCase
from django.shortcuts import reverse
from rest_framework.test import APIRequestFactory, force_authenticate
from mixer.backend.django import mixer
from apps.exam.views import TopicListView
from apps.exam.serializers import TopicSerializer


class TestTopicViews(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.url = reverse("topics-list")
        self.topic_list = mixer.cycle(5).blend("exam.Topic")
        self.user = mixer.blend("user.User")

    def test_list_view(self):
        request = self.factory.get(self.url)
        force_authenticate(request, user=self.user)
        response = TopicListView.as_view()(request)
        response_data = []
        for topic in self.topic_list:
            serialized_topic = TopicSerializer(instance=topic)
            response_data.append(serialized_topic.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(list(response.data), response_data)

    def test_non_authenticated_user(self):
        request = self.factory.get(self.url)
        response = TopicListView.as_view()(request)
        self.assertEqual(response.status_code, 401)
