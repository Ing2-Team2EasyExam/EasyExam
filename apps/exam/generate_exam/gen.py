import os
import subprocess
from datetime import datetime, date
from subprocess import PIPE

from django.conf import settings
from .exceptions import CompilationErrorException
import logging

logger = logging.getLogger(__name__)
handler = logging.StreamHandler()
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)


def problem_pbtex(problem: "Problem") -> str:
    """
    Returns the pbtex content for the given problem.
    :param problem: A problem instance of the Problem model
    :return: str
    """
    pbtex_iterable = (
        "\\begin{authorship}\n",
        problem.author,
        "\n\\end{authorship}\n",
        problem.content,
    )
    return "".join(pbtex_iterable)


def problem_tex(
    problem: "Problem"
) -> str:  # Dont use actual class because of circular imports
    """
    Returns the content of the tex file for the given problem, used to generate the problem pdf.
    :param problem: Problem instance
    :return: String
    """
    tex_iterable = (
        "\\documentclass[]{problem}\n",
        "\\usepackage{course}\n\n",
        "\\begin{document}\n",
        get_input_problem(problem, ""),
        "\\end{document}\n",
    )
    return "".join(tex_iterable)


def get_input_problem(problem, marking):
    """
    Returns the inputProblem command for the tex file, filled with the path for the given problem and marking
    scheme.
    :param problem: Problem instance
    :param marking: Marking scheme for the problem
    :return: String
    """
    path = os.path.join(settings.MEDIA_ROOT, problem.pbtex_file.name)
    relpath = os.path.relpath(path, settings.SCRIPT_DIR)
    rel = os.path.join(os.path.dirname(relpath))
    filename = os.path.basename(relpath)
    return "\\inputProblem{{{rel}/}}{{{filename}}}{{{marking}}}\n".format(
        rel=rel, filename=filename, marking=marking
    )


def add_command(command: str, value: str) -> str:
    return "\\renewcommand{{\\{command}}}{{\\texttt{{{value}}}}}\n".format(
        command=command, value=value
    )


def exam_tex(exam):
    """
    Returns the content of the tex file for the given exam, used to generate the exam pdf.
    :param exam: Exam instance
    :return: String
    """

    tex = []

    tex.append("\\documentclass[]{exam}\n")
    tex.append("\\usepackage{course}\n\n")

    if exam.language == "EN":
        tex.append("\\includeversion{english}\n")
        tex.append("\\excludeversion{spanish}\n")

    else:
        tex.append("\\includeversion{spanish}\n")
        tex.append("\\excludeversion{english}\n")

    tex.append("\\begin{document}\n")

    tex.append(add_command("examName", exam.name))
    tex.append(add_command("examDate", exam.date))
    tex.append(add_command("examStartTime", exam.start_time))
    tex.append(add_command("examEndTime", exam.end_time))
    tex.append(add_command("institution", exam.university))
    tex.append(add_command("courseName", exam.course))
    tex.append(
        add_command(
            "examLength",
            datetime.combine(date.min, exam.end_time)
            - datetime.combine(date.min, exam.start_time),
        )
    )
    tex.append(add_command("courseInstructors", exam.teacher))
    tex.append(add_command("courseCode", exam.course_code))

    tex.append("\\maketitle\n")
    problems = exam.problems.all()
    for problem in problems:
        tex.append(get_input_problem(problem, "2 pts"))

    tex.append("\\end{document}\n")

    return "".join(tex)


def generate_pdfs(instance):
    """
    Calls the buildExam.pl script contained in the SCRIPT_DIR directory, with parameter the tex file
    for the given instance (Exam or Problem), if there's an error in the compilation an exception
    CompilationErrorException is raised. On success the files will be saved in the corresponding
    model and the extra files will be deleted, check Exam / Problem models.
    :param instance: Exam or Problem instance
    :return: Path of the files generated
    """
    filename = os.path.basename(instance.tex_file.name)
    filename = os.path.splitext(filename)[0]
    with open(os.devnull, "w") as nul:
        command = [
            os.path.join(settings.SCRIPT_DIR, "buildExam.pl"),
            os.path.join(settings.MEDIA_ROOT, instance.tex_file.name),
        ]
        if settings.WINDOWS_USER:
            command = ["perl"] + command
        result = subprocess.run(
            command, cwd=settings.SCRIPT_DIR, stdout=PIPE, stderr=PIPE
        )
        if result.returncode != 0:
            latex_logs = result.stdout.decode("utf-8")
            raise CompilationErrorException(latex_logs)
    return (
        os.path.join(settings.SCRIPT_DIR, filename + "_normal.pdf"),
        os.path.join(settings.SCRIPT_DIR, filename + "_solution.pdf"),
    )
