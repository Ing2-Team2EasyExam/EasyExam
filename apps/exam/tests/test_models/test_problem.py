from django.test import TestCase
from mixer.backend.django import mixer
from unittest import mock, skip


class TestProblem(TestCase):
    def setUp(self):
        self.problem = mixer.blend(
            "exam.Problem", name="Problema bonito", author="Jeremy"
        )

    def test_str_method(self):
        self.assertEqual(str(self.problem), "Problema bonito -- Jeremy")

    @skip("Test need tweaks for working")
    def test_generate_pdfs(self):
        open_mock = mock.mock_open(read_data="Open mock data")
        with mock.patch("apps.exam.models.generate_pdfs") as generate_mock:
            with mock.patch("apps.exam.models.open", open_mock, create=True):
                with mock.patch("apps.exam.models.os") as os_mock:
                    generate_mock.return_value = ("a/normal/path", "a/solution/path")
                    os_mock.remove.return_value = None
                    self.problem.generate_pdf()
                    open_mock.assert_called_once()
                    os_mock.remove.assert_called_once()
                    generate_mock.assert_called_once()
