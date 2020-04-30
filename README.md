# EasyExam

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Python 3.6

Install [pre-commit](https://pre-commit.com/#install)

### Installing

The following steps will help you get a development env running
```bash
$ git clone git@bitbucket.org:is2dcc/easyexam.git
$ cd easyexam
$ python3 -m venv ./venv
$ source venv/bin/activate
$ pip install -r requirements.txt
$ cd easyexam
$ python manage.py migrate
$ python manage.py runserver
```

## In case of migration errors
If the migrations don't work reset the database
```bash
$ python manage.py flush`
$ find . -path "*/migrations/*.py" -not -name "__init__.py" -delete`
$ find . -path "*/migrations/*.pyc" -delete`
$ rm db.sqlite3`
```

## Deployment instructions

The backend runs with NGINX and UWSGI

You can run the current configuration with
```bash
$ uwsgi --http localhost:8000 --wsgi-file EasyExamAPI/wsgi.py --static-map /static=./static &
```
Or
```bash
$ HOME/easyexam/venv/bin/uwsgi --ini $HOME/easyexam-uwsgi/easyexam-uwsgi.ini
```

To build the frontend bundle
```bash
$ yarn
$ yarn build
```
Then copy it to the repositorium/www Folder
