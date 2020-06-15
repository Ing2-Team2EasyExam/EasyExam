from django.shortcuts import get_object_or_404
from .models import Problem, Exam, Topic
from typing import Set, Tuple, List


def get_problems_from_serializers(serialized_problems: List[dict]) -> List[Problem]:
    problems = list()
    for serialized_problem in serialized_problems:
        problem = Problem.objects.get(
            name=serialized_problem["name"], author=serialized_problem["author"]
        )
        problems.append(problem)
    return problems


def update_exam(uuid, **data) -> Exam:
    problems = data.pop("problems")
    exam = get_object_or_404(klass=Exam, pk=uuid)

    for key in data:
        setattr(exam, key, data[key])
    exam.problems.set(problems)
    exam.save()
    try:
        exam.generate_pdf()
        return exam
    except CompilationErrorException as err:
        raise ValidationError(err.latex_logs)
    except Exception:
        raise ValidationError(
            "There was an internal error in the compilation of the latex file"
        )


def create_exam(**data) -> Exam:
    name = data["name"]
    owner = data["owner"]
    teacher = data["teacher"]
    university = data["university"]
    course_name = data["course_name"]
    course_code = data["course_code"]
    language = data["language"]
    problems = data["problems"]
    due_date = data["due_date"]
    start_time = data["start_time"]
    end_time = data["end_time"]

    exam = Exam.objects.create(
        name=name,
        owner=owner,
        teacher=teacher,
        university=university,
        course_name=course_name,
        course_code=course_code,
        language=language,
        due_date=due_date,
        start_time=start_time,
        end_time=end_time,
    )
    exam.problems.set(problems)
    try:
        exam.generate_pdf()
        return exam
    except CompilationErrorException as err:
        exam.delete()
        raise ValidationError(err.latex_logs)
    except Exception:
        exam.delete()
        raise ValidationError(
            "There was an internal error in the compilation of the latex file"
        )


def get_problem_topics(problem: Problem) -> Set[str]:
    """
    Returns a set with the problem's topics names
    :param problem: An instance of the model Problem
    :return: A set of strings with the problem's topics
    """
    topics = set()
    for topic in problem.topics.all():
        topics.add(topic.name)
    return topics


def get_exam_topics(exam: Exam) -> Set[str]:
    """
    Returns a set with the exam's topics, corresponds to the union of the problems topics of the exam
    :param exam: An instance of the model Exam
    :return: A set of strings with te exam's topics
    """
    topics = set()
    for problem in exam.problems.all():
        for topic in get_problem_topics(problem):
            topics.add(topic)
    return topics
