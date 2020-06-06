from django.test import TestCase
from mixer.backend.django import mixer
from datetime import datetime, timedelta, time


class TestExam(TestCase):
    def setUp(self):
        start_time = datetime.now()
        end_time = start_time + timedelta(hours=1)
        self.exam = mixer.blend("exam.Exam", start_time=start_time, end_time=end_time)

    def test_str_method(self):
        self.assertEqual(str(self.exam), self.exam.name)

    def test_duration(self):
        self.assertEqual(self.exam.duration, (1, 0))
