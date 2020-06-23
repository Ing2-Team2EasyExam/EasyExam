FROM python:3.7

ENV PYTHONUNBUFFERED 1

COPY . /easyexam/
WORKDIR /easyexam/

RUN pip install -r requirements.txt

EXPOSE 8000
