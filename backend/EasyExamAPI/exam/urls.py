from django.urls import path

from exam.views import TopicList, ExamList, ExamDetail, ExamPay, ProblemList, ProblemDetail, ProblemCreate, ExamCreate, \
    ExamPDF, ExamPDFSolution, ProblemRandom, ProblemPDF, \
    PreviewLatex, PreviewLatexPDF

urlpatterns = [
    path('topics/', TopicList.as_view(), name='category-list'),
    path('exams/', ExamCreate.as_view(), name='exam-create'),
    path('exams/owned/', ExamList.as_view(), name='exam-list'),
    path('exams/<uuid:uuid>/', ExamDetail.as_view(), name='exam-detail'),
    path('exams/<uuid:uuid>/pay/', ExamPay.as_view(), name='exam-pay'),
    path('exams/<uuid:uuid>/pdf/', ExamPDF.as_view(), name='exam-pdf'),
    path('exams/<uuid:uuid>/pdf-solution/', ExamPDFSolution.as_view(), name='exam-pdf-solution'),
    path('problems/', ProblemCreate.as_view(), name='problem-create'),
    path('problems/uploaded/', ProblemList.as_view(), name='problem-list'),
    path('problems/random/', ProblemRandom.as_view(), name='problem-random'),
    path('problems/<uuid:uuid>/', ProblemDetail.as_view(), name='problem-detail'),
    path('problems/<uuid:uuid>/pdf/', ProblemPDF.as_view(), name='problem-pdf'),
    path('preview-latex/', PreviewLatex.as_view(), name='preview-latex'),
    path('preview-latex/<uuid:uuid>/pdf/', PreviewLatexPDF.as_view(), name='preview-latex-pdf')
]
