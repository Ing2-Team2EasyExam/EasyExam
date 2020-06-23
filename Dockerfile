FROM python:3.7

ENV PYTHONUNBUFFERED 1

COPY . /easyexam/
WORKDIR /easyexam/

RUN apt-get update
RUN yes | apt-get install texlive-latex-base
RUN yes | apt-get install texlive-latex-extra
RUN yes | apt-get install texlive
RUN yes | apt-get install texlive-science
RUN yes | apt-get install texlive-pstricks
RUN yes | apt-get install nodejs
RUN yes | apt-get install npm
RUN pip install -r requirements.txt
RUN cd frontend/ && npm install
