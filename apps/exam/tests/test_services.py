from apps.exam import services
from django.test import TestCase
from mixer.backend.django import mixer


class TestTopicServices(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.topics = mixer.cycle(5).blend("exam.Topic")
        self.problem = mixer.blend("exam.Problem", topics=self.topics)
        self.exam = mixer.blend("exam.Exam")
        self.exam.problems.add(self.problem)
        self.exam.save()

    def test_get_problem_topics(self):
        problem_topics = services.get_problem_topics(self.problem)
        for topic in self.topics:
            self.assertIn(str(topic), problem_topics)

    def test_get_exam_topics(self):
        exam_topics = services.get_exam_topics(self.exam)
        for topic in self.topics:
            self.assertIn(str(topic), exam_topics)


class TestSerializerServices(TestCase):
    def test_get_problems_for_serializers(self):
        problems = mixer.cycle(5).blend("exam.Problem")
        problem_data = [
            {"name": problem.name, "author": problem.author} for problem in problems
        ]
        services_problems = services.get_problems_from_serializers(problem_data)
        self.assertEqual(len(services_problems), 5)
        for problem in problems:
            self.assertIn(problem, services_problems)

    def test_get_problem_from_serializer(self):
        expected_problem = mixer.blend("exam.Problem")
        problem_data = {
            "name": expected_problem.name,
            "author": expected_problem.author,
        }
        problem = services.get_problem_from_serializer(problem_data)
        self.assertEqual(problem.name, expected_problem.name)
        self.assertEqual(problem.author, expected_problem.author)


class TestProblemServices(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.problem = mixer.blend("exam.Problem", uploader=self.user)

    def test_problem_is_not_used(self):
        self.assertFalse(services.check_problem_is_used(self.problem))

    def test_problem_is_used(self):
        exam = mixer.blend("exam.Exam")
        exam.problems.add(self.problem)
        exam.save()
        self.assertTrue(services.check_problem_is_used(self.problem))

    def test_get_problem_points(self):
        exam = mixer.blend("exam.Exam")
        exam.problems.add(self.problem)
        exam.save()
        status, points = services.get_problem_points(self.problem, exam)
        self.assertEqual(status, 200)
        self.assertEqual(points, 2)
