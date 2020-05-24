from django.test import TestCase
from mixer.backend.django import mixer
from apps.exam.serializers import TopicSerializer, ProblemListSerializer


class TestTopicSerializer(TestCase):
    def setUp(self):
        self.topic = mixer.blend("exam.Topic")
        self.topic_data = {"name": self.topic.name}

    def test_empty_serializer(self):
        empty_topic = TopicSerializer()
        self.assertEqual(empty_topic.data, {})

    def test_topic_serializer_constructor(self):
        serialized_topic = TopicSerializer(self.topic)
        self.assertEqual(serialized_topic.data, self.topic_data)

    def test_new_topic(self):
        updated_
