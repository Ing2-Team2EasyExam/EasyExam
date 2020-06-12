from .models import Problem, Exam, Topic
from typing import Set, Tuple, List


def create_or_update_exam(**data) -> Exam:
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

    exam, created = Exam.objects.update_or_create(
        name=name,
        owner=owner,
        teacher=teacher,
        university=university,
        course_name=course_name,
        course_code=course_code,
        language=language,
        due_date=dute_date,
        start_date=start_date,
        end_time=end_time,
        problems=problems,
    )
    try:
        exam.generate_pdf()
    except CompilationErrorException as err:
        if created:
            exam.delete()
        raise ValidationError(err.latex_logs)
    except Exception:
        if created:
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
