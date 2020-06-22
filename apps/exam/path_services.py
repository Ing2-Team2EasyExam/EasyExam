def exam_path(instance, filename):
    return "exams/{pk}/{filename}".format(pk=instance.pk, filename=filename)


def exam_normal_path(instance, filename):
    return exam_path(instance, "normal{pk}.pdf".format(pk=instance.pk))


def exam_solution_path(instance, filename):
    return exam_path(instance, "solution{pk}.pdf".format(pk=instance.pk))


def exam_tex_path(instance, filename):
    return exam_path(instance, "exam{pk}.tex".format(pk=instance.pk))


def problem_path(instance, filename):
    return "problems/{pk}/{filename}".format(pk=instance.pk, filename=filename)


def problem_pbtex_path(instance, filename):
    return problem_path(instance, "problem{pk}.pbtex".format(pk=instance.pk))


def problem_pdf_path(instance, filename):
    return problem_path(instance, "problem{pk}.pdf".format(pk=instance.pk))


def problem_tex_path(instance, filename):
    return problem_path(instance, "problem{pk}.tex".format(pk=instance.pk))


def image_path(instance, filename):
    return problem_path(instance.problem, "/{filename}".format(filename=filename))
