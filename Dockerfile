FROM python:3.7

ENV PYTHONUNBUFFERED 1

COPY ./apps /easyexam/apps
COPY ./EasyExamAPI /easyexam/EasyExamAPI
COPY ./fixtures /easyexam/fixtures
COPY ./frontend /easyexam/frontend
COPY ./media /easyexam/media
COPY ./easyexam.sh /easyexam/
COPY ./manage.py /easyexam/
COPY ./requirements.txt /easyexam/
COPY ./*ipynb /easyexam/
RUN chmod -R 777 /easyexam/
WORKDIR /easyexam/

RUN chmod +x easyexam.sh
RUN apt-get update
RUN yes | apt-get install texlive-latex-base
RUN yes | apt-get install texlive-latex-extra
RUN yes | apt-get install texlive
RUN yes | apt-get install texlive-science
RUN yes | apt-get install texlive-pstricks
RUN yes | apt-get install nodejs
RUN yes | apt-get install npm
RUN yes | npm install npm@latest -g
RUN pip install -r requirements.txt
RUN cd frontend/ && npm install

RUN adduser easyexam
USER easyexam
RUN echo "source /easyexam/easyexam.sh" >> ~/.bashrc

EXPOSE 8000
EXPOSE 8001
