from django.test import TestCase
from mixer.backend.django import mixer


class TestTopic(TestCase):
    def setUp(self):
        self.topic = mixer.blend("exam.Topic", name="My topico favorito")

    def test_topic_str(self):
        self.assertEqual(str(self.topic), "My topico favorito")
