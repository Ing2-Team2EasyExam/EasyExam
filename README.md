# EasyExam

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Developing locally

To develop on this project on your local machine (i.e your computer) you need to install

- Python 3.7
- [pre-commit](https://pre-commit.com/#install)
- [Docker](https://www.docker.com/get-started)
- [GNU Make]() (This is pre-installed on Unix based systems)
- [Git]() (This is pre-installed on Linux or Mac)
  Then follow this guideline to use it.

## Running the servers locally

We use docker to develop on containers locally, a container is a more simple virtual machine of ubuntu. This is why we need to install docker on our system first, make sure on the terminal.
Check if you have docker and docker-compose by doing:

```bash
$ docker -v
$ docker-compose -v
```

Here it is a makefile that does almost everything for you. To use it on your local machine (With a running Unix base system like linux with ubuntu distro) just type:

```bash
make <name_of_the_command>
```

The most important ones are described on the following table:

| Instruction  | What it does                                                            |
| ------------ | ----------------------------------------------------------------------- |
| docker-build | Build the docker container on your local pc                             |
| docker-up    | Launch the terminal that is going to be used for running the project    |
| docker-stop  | Stop the the docker container                                           |
| docker-down  | Stop the image and delete the containers                                |
| docker-prune | Delete unused images of the container, useful when it's short of memory |
| docker-reset | Delete the containers, and rebuilt them from scratch                    |

For all commands descriptions type `make` on the command line for help

On the container terminal there are some useful commands to use, which are used with:

```bash
easyexam <name-of-the-command>
```

This are resumend in:
| Instruction | What it does |
| ------------------ | ---------------------------------------------------------------- |
| install | Install the frontend and backend dependencies |
| backend-install | Install only the backend dependencies |
| frontend-install | Install only the dependencies of the frontend |
| makemigrations | Make the django migrations of the models |
| migrate | Apply the database migrations in the project |
| jupyter | Launch jupyter notebook on the port 8001 |
| run | Run the project on the port 8000 |
| test | Run the test for the frontend and backend |
| backend-test | Run the test for the backend |
| fixtures | Load the database initial data |

## Installing and running the system (Unix based systems)

First of all, this guide is for unix like system like linux with ubuntu. Then search (or make) the folder of this project and run the commands as told on this tutorial.

First of all download the repo on the local machine with https (or ssh if you have a ssh key configurated on your github)

```bash
$ git clone https://github.com/Ing2-Team2EasyExam/EasyExam.git
```

Fill the credentials with your own ones. Then install pre commit on this repo:

```bash
$ pre-commit install
```

This make when you commit, change the files to have a good structure. If a check doesn't pass, pre-commit will change the files so add them and make the commit again.

Now, we have our makefile that does everything for us. (Be sure that you have docker on your machine!). So first things first, let's build the container on your local machine:

```bash
$ make docker-build
```

This will take **several minutes** but when it's finished, do:

```bash
$ make docker-up
```

Now you will be on the docker container command prompt, so with this you can run the project. First things first, **never use a git command here**, this is only for running the project (making the migrations, etc...), nothing more than that.

So now let's start doing some migrations, for that run:

```bash
easyexam makemigrations
easyexam migrate
```

This commands will run the migrations to the `postgresql`, we have postgresql on the container (docker magic uau), so this is best when trying to have an environment close as posible to production.

Next up, let's set up the frontend. To do this, we run on the docker container:

```bash
$ easyexam install
```

That will install all the dependencies of the project, including our frontend and webpack.

After that let's add some initial data to our database, run:

```bash
$ easyexam fixtures
```

And that should load the initial users and data of our system.

Finally, let's run the server. Run on your terminal with docker:

```bash
$ easyexam runserver
```

### Using jupyter

You can use jupyter on the backend if you want, to run it do:

```bash
easyexam jupyter
```

And select django shell plus as interpreter

#### Local settings

If you want to change some settings but doesn't need to have it on the development environment, on the `EasyExamAPI.settings` module you can add a file `local.py` which is by default ignored for git. This has to import all the settings of the development one in order to work, so your file should always begin with:

```py
# local.py in the settings module
from .development import *
```

For example a common thing to do is change the renderer to a browsable API, then your file:

```py
from .development import *
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = (
    "rest_framework.renderers.BrowsableAPIRenderer,
)
```

If any settings change that you want to perform doesn't have to be for everyone, put that change (by overriding the variable or adding some things) on the `local.py` setting file.

#### Running test

To run unittest on your local machine, on the docker terminal run the command:

```bash
$ easyexam test
```

This will run all the test (frontend and backend) on the container. Currently there is only backend tests, so to run only those you can do:

```bash
$ easyexam backend-test
```

If you want to run a particular test suit, you can run the command:

```bash
$ easyexam backend-test <test-suite-import-path>
```

For example:

```bash
$ easyexam backend-test apps.exam.tests.test_views.test_exam
```

If you want to run only a class for that suite:

```bash
$ easyexam backend-test apps.exam.tests.test_views.test_exam::TestExamCreateView
```

And if you want to run only a method of that suite:

```bash
$ easyexam backend-test apps.exam.tests.test_views.test_exam::TestExamCreateView::test_create_exam_anonymous
```

#### Reseting docker image

**WARNING** This will delete the database mounted on the docker container, so be carefull to not lose the data. You should avoid these at all cost.

If you want to reset your docker image of the project and re mounted, run:

```bash
$ make docker-reset
```

#### Adding pre recorded data

On `fixtures` there are jsons with pre recorded data, to add them onto your database you can run on the container terminal:

```bash
$ easyexam fixtures
```

This will add all pre recorded data, if a model change pls change the pre recorded data also.

### Pull Request

The common developing branch is `development`. On this branch all the newest changes are being made and the QA is being performed. All the QA must pass to an issue of a bug or a non existant feature.

Finally, to merge into the `development` branch, you need to create a pull request and it needs to be approved by, at least, one other teammate and pass the CI github action.

At the end of every sprint (there will be two sprints), a merge to master will be done or if a common developing feature is added to develop is going to be cherry-picked to master as well.

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

## Some learning

- [celery](https://realpython.com/asynchronous-tasks-with-django-and-celery/#celery-tasks)
- [redis](https://realpython.com/caching-in-django-with-redis/)
- [redis_and_celery](https://stackabuse.com/asynchronous-tasks-in-django-with-redis-and-celery/)
- [django_jupyter](https://medium.com/ayuth/how-to-use-django-in-jupyter-notebook-561ea2401852)
