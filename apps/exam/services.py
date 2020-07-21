import datetime
from typing import List, Set, Tuple

from django.core.exceptions import ObjectDoesNotExist
from django.forms import ValidationError
from django.shortcuts import get_object_or_404

from apps.user.models import User

from .generate_exam.exceptions import CompilationErrorException
from .models import Exam, Image, Problem, Topic


def get_problem(problem_id: str) -> Problem:
    return get_object_or_404(klass=Problem, pk=problem_id)


def recompile_problem(problem: Problem) -> None:
    problem.save()
    problem.generate_pdf()


def regenerate_exam_problems(exam: Exam) -> None:
    exam_problems = exam.problems.all()
    for problem in exam_problems:
        recompile_problem(problem)


def recompile_exam(exam: Exam) -> None:
    regenerate_exam_problems(exam)
    exam.save()
    exam.generate_pdf()


def get_problem_from_serializer(serialized_problem: dict) -> Problem:
    return get_object_or_404(
        klass=Problem,
        name=serialized_problem["name"],
        author=serialized_problem["author"],
    )


def get_problems_from_serializers(serialized_problems: List[dict]) -> List[Problem]:
    problems = list()
    for serialized_problem in serialized_problems:
        problem = get_problem_from_serializer(serialized_problem)
        problems.append(problem)
    return problems


def update_exam(uuid, **data) -> Exam:

    serialized_problems_choices = data.pop("problem_choices")
    exam = get_object_or_404(klass=Exam, pk=uuid)

    for key in data:
        setattr(exam, key, data[key])

    exam.problems.clear()
    for serialized_problem_choice in serialized_problems_choices:
        serialized_problem = serialized_problem_choice["problem"]
        points = serialized_problem_choice.get("points", 2)
        problem = get_problem_from_serializer(serialized_problem)
        exam.problems.add(problem, through_defaults={"points": points})

    exam.save()
    try:
        regenerate_exam_problems(exam)
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
    due_date = data["due_date"]
    start_time = data["start_time"]
    end_time = data["end_time"]
    serialized_problems_choices = data.get("problem_choices", [])
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
    for serialized_problem_choice in serialized_problems_choices:
        serialized_problem = serialized_problem_choice["problem"]
        points = serialized_problem_choice.get("points", 2)
        problem = get_problem_from_serializer(serialized_problem)
        exam.problems.add(problem, through_defaults={"points": points})
    exam.save()
    try:
        regenerate_exam_problems(exam)
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
        Image.objects.create(image=figure_data, problem=problem, name=figure_data.name)
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
            image=figure_data, problem=problem, name=figure_data.name
        )
    problem.save()
    try:
        problem.generate_pdf()
    except CompilationErrorException as err:
        raise err
    return problem


def get_problem_points(problem: Problem, exam: Exam) -> Tuple[int, int]:
    try:
        relation_model = problem.examproblemchoice_set.get(exam=exam)
        return 200, relation_model.points
    except ObjectDoesNotExist:
        return 404, -1


def clone_problem(problem: Problem, uploader: User) -> Problem:
    clone_creation_time = datetime.datetime.now().isoformat()
    clone_name = (
        f"{problem.name} clone for {uploader.full_name} at time {clone_creation_time}"
    )
    clone_author = problem.author
    clone_uploader = uploader
    clone_statement = problem.statement_content
    clone_solution = problem.solution_content
    clone_topics = problem.topics.all()
    original_images = problem.image_set.all()

    clone = Problem.objects.create(
        name=clone_name,
        author=clone_author,
        uploader=clone_uploader,
        statement_content=clone_statement,
        solution_content=clone_solution,
    )
    clone.topics.set(clone_topics)

    for image in original_images:
        Image.objects.create(image=image.image, problem=clone, name=image.name)
    clone.save()
    try:
        clone.generate_pdf()
    except CompilationErrorException as err:
        clone.delete()
        raise err
    return clone
