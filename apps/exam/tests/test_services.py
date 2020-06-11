from apps.exam import services
from django.test import TestCase
from mixer.backend.django import mixer


class TestTopicServices(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.topics = mixer.cycle(5).blend("exam.Topic")
        self.problem = mixer.blend("exam.Problem", topics=self.topics)
        self.exam = mixer.blend("exam.Exam", problems=[self.problem])

    def test_get_problem_topics(self):
        problem_topics = services.get_problem_topics(self.problem)
        for topic in self.topics:
            self.assertIn(str(topic), problem_topics)

    def test_get_exam_topics(self):
        exam_topics = services.get_exam_topics(self.exam)
        for topic in self.topics:
            self.assertIn(str(topic), exam_topics)
