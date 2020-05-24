from django.test import TestCase
from mixer.backend.django import mixer
from apps.exam.serializers import TopicSerializer, ProblemListSerializer


class TestTopicSerializer(TestCase):
    def setUp(self):
        self.topic = mixer.blend("exam.Topic")
        self.topic_data = {"name": self.topic.name}

    def test_empty_serializer(self):
        empty_topic = TopicSerializer()
        self.assertEqual(empty_topic.data, {"name": ""})

    def test_topic_serializer_constructor(self):
        serialized_topic = TopicSerializer(self.topic)
        self.assertEqual(serialized_topic.data, self.topic_data)

    def test_new_topic(self):
        new_data = {"name": "Hey I am a new topic"}
        creator_serializer = TopicSerializer(data=new_data)
        self.assertTrue(creator_serializer.is_valid())
        new_topic = creator_serializer.save()
        new_topic.refresh_from_db()
        self.assertEqual(str(new_topic), "Hey I am a new topic")

    def test_update_topic(self):
        update_data = {"name": "I am updated name"}
        update_serializer = TopicSerializer(instance=self.topic, data=update_data)
        self.assertTrue(update_serializer.is_valid())
        updated_topic = update_serializer.save()
        updated_topic.refresh_from_db()
        self.assertEqual(str(updated_topic), "I am updated name")
        self.assertEqual(updated_topic.pk, self.topic.pk)


class TestProblemListSerializer(TestCase):
    def setUp(self):
        self.problem = mixer.blend("exam.Problem")
        self.problem_data = {
            "name": self.problem.name,
            "author": self.problem.author,
            "created_at": self.problem.created_at,
            "topics": self.problem.topics.all(),
        }

    def test_empty_serializer(self):
        empty_problem = ProblemListSerializer()
        self.assertEqual(empty_problem.data, {"name": "", "author": "", "topics": []})

    def test_problem_serializer_constructor(self):
        problem_serializer = ProblemListSerializer(instance=self.problem)
        self.assertEqual()
