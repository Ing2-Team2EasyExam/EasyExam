import os
import subprocess
from datetime import datetime, date
from subprocess import PIPE

from django.conf import settings


def problem_pbtex(problem):
    """
    Returns the pbtex content for the given problem.
    :param problem: A problem instance of the Problem model
    :return: String
    """
    pbtex = ""

    pbtex += "\\begin{authorship}\n"
    pbtex += problem.author
    pbtex += "\n\\end{authorship}\n"

    pbtex += problem.content

    return pbtex


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


def exam_tex(exam):
    """
    Returns the content of the tex file for the given exam, used to generate the exam pdf.
    :param exam: Exam instance
    :return: String
    """

    def add_command(command, value):
        return "\\renewcommand{{\\{command}}}{{\\texttt{{{value}}}}}\n".format(
            command=command, value=value
        )

    tex = ""

    tex += "\\documentclass[]{exam}\n"
    tex += "\\usepackage{course}\n\n"

    if exam.language == "E":
        tex += "\\includeversion{english}\n"
        tex += "\\excludeversion{spanish}\n"

    else:
        tex += "\\includeversion{spanish}\n"
        tex += "\\excludeversion{english}\n"

    tex += "\\begin{document}\n"

    tex += add_command("examName", exam.name)
    tex += add_command("examDate", exam.date)
    tex += add_command("examStartTime", exam.start_time)
    tex += add_command("examEndTime", exam.end_time)
    tex += add_command("institution", exam.university)
    tex += add_command("courseName", exam.course)
    tex += add_command(
        "examLength",
        datetime.combine(date.min, exam.end_time)
        - datetime.combine(date.min, exam.start_time),
    )
    tex += add_command("courseInstructors", exam.teacher)
    tex += add_command("courseCode", exam.course_code)

    tex += "\\maketitle\n"

    for problem in exam.problems.all():
        tex += get_input_problem(problem, "2 pts")

    tex += "\\end{document}\n"

    return tex


def problem_tex(problem):
    """
    Returns the content of the tex file for the given problem, used to generate the problem pdf.
    :param problem: Problem instance
    :return: String
    """
    tex = ""

    tex += "\\documentclass[]{problem}\n"
    tex += "\\usepackage{course}\n\n"
    tex += "\\begin{document}\n"
    tex += get_input_problem(problem, "")
    tex += "\\end{document}\n"

    return tex


class CompilationErrorException(Exception):
    def __init__(self, latex_logs):
        super().__init__()
        self.latex_logs = latex_logs


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
        result = subprocess.run(
            [
                os.path.join(settings.SCRIPT_DIR, "buildExam.pl"),
                os.path.join(settings.MEDIA_ROOT, instance.tex_file.name),
            ],
            cwd=settings.SCRIPT_DIR,
            stdout=PIPE,
            stderr=nul,
        )
        if result.returncode != 0:
            latex_logs = result.stdout.decode("utf-8")
            raise CompilationErrorException(latex_logs)
    return (
        os.path.join(settings.SCRIPT_DIR, filename + "_normal.pdf"),
        os.path.join(settings.SCRIPT_DIR, filename + "_solution.pdf"),
    )
