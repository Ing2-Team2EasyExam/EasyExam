from django.shortcuts import get_object_or_404
from .models import Problem, Exam, Topic
from typing import Set, Tuple, List
from .generate_exam.exceptions import CompilationErrorException
from django.forms import ValidationError


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
    exam.save()
    try:
        exam.generate_pdf()
        return exam
    except CompilationErrorException as err:
        exam.delete()
        raise err
    except Exception as err:
        exam.delete()
        raise err


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


def check_problem_is_used(problem: Problem) -> bool:
    return problem.exam_set.exists()


def create_problem(**data) -> Problem:
    topics_data = data.get("topics_data", [])
    figures = data.get("figures", [])
    name = data["name"]
    author = data["author"]
    statement_content = data["statement_content"]
    solution_content = data["solution_content"]
    uploader = data["uploader"]
    problem = Problem.objects.create(
        name=name,
        author=author,
        statement_content=statement_content,
        solution_content=solution_content,
        uploader=uploader,
    )
    topics = []
    for topic_name in topics_data:
        topic, _ = Topic.objects.get_or_create(name=topic_name)
        topics.append(topic.pk)
    problem.topics.set(topics)
    for figure_data in figures:
        Image.objects.create(image=figure_data, problem=problem, nanem=figure_data.name)
    problem.save()
    try:
        problem.generate_pdf()
    except CompilationErrorException as err:
        problem.delete()
        raise err
    return problem


def update_problem(uuid, **data) -> Problem:
    problem = get_object_or_404(klass=Problem, pk=uuid)
    topics_data = data.pop("topics_data")
    figures = data.pop("figures")
    for key in data:
        setattr(problem, key, data[key])
    topics = []
    for topic_name in topics_data:
        topic, _ = Topic.objects.get_or_create(name=topic_name)
        topics.append(topic.pk)
    problem.topics.set(topics)
    for figure_data in figures:
        Image.objects.get_or_create(
            image=figure_data, problem=problem, nanem=figure_data.name
        )
    problem.save()
    try:
        problem.generate_pdf()
    except CompilationErrorException as err:
        raise err
    return problem
