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
RUN chmod -R 755 /easyexam/
WORKDIR /easyexam/

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
RUN cd frontend/ && npm run build
RUN python manage.py collectstatic --noinput
RUN adduser easyexam
USER easyexam
RUN echo "source /easyexam/easyexam.sh" >> ~/.bashrc

CMD gunicorn EasyExamAPI.wsgi:application --bind 0.0.0.0:$PORT
