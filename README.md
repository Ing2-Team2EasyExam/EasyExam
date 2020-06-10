# EasyExam

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Developing locally

To develop on this project on your local machine (i.e your computer) you need to install

- Python 3.7
- [pre-commit](https://pre-commit.com/#install)

Then follow this guideline to use it.

## Running the servers locally

Here it is a makefile that does almost everything for you. To use it on your local machine (With a running Unix base system like linux with ubuntu distro) just type:

```bash
make <name_of_the_command>
```

The most important ones are described on the following table:

| Instruction        | What it does                                                     |
| ------------------ | ---------------------------------------------------------------- |
| create-environment | Creates a local virtual environment to run the backend           |
| install            | Install all frontend and backend dependencies                    |
| install-redis      | Install redis on local machine with wget                         |
| run                | Runs project on local machine port `8000`                        |
| redis-run          | Runs redis on local machine port `6379`                          |
| db-update          | Runs makemigrations and migrate of django on backend             |
| test               | Runs all test of the project                                     |
| reset              | Delete previous database and create a new one with no data on it |
| reset-full         | Reset all db's and starts new ones                               |

For all commands descriptions type `make` on the command line for help

### Using jupyter

You can use jupyter on the backend if you want, to run it do:

```bash
make jupyter
```

And select django shell plus as interpreter

#### Installing and running the system

First of all, this guide is for unix like system like linux with ubuntu. So plis, if your are using windows install WSL (Linux subsystem for Windows) and with ubuntu distro on it. Then search the folder of this project and run the commands as told on this tutorial.

First of all download the repo on the local machine with https (or ssh if you have a ssh key configurated on your github)

```bash
$ git clone https://github.com/Ing2-Team2EasyExam/EasyExam.git
```

Fill the credentials with your own ones. Then install pre commit on this repo:

```bash
$ pre-commit install
```

This make the commits on the files have a good structure. If a check doesn't pass, pre-commit will change the files so add them and make the commit again.

Now, we have our makefile that does everything for us.
The first thing to install is `nodejs` to run the react server on the local machine. In order to do this we have the command on the makefile:

```bash
$ make ubuntu-node
# if your are using macOS with homebrew use:
# make brew-node
```

Fill up the credentials for your sudo user and then this will install `nodejs` on your computer.

The second thing is to install the dependencies, so first of all make a python virtualenvironment with:

```bash
$ make create-environment
```

This will make a virtual environment folder of name `venv`, make sure to **never** commit this folder, the name of the `venv` is on the gitignore, if you change it's name pls add it to the gitignore.

Now that we have our environment created let's start it, the makefile don't support this operation so we have to manually start it on our terminal:

```bash
$ source venv/bin/activate
```

That should start a virtual environment when all the dependencies will be stored. Having a virtual environment is a good practice on every python project that you have, not just this one or the ones that runs django.

Now let's install the dependencies with:

```bash
make install
```

This will install all backend and frontend dependencies that are described on the `requirements.txt` and `package.json` files. So if you want to add a dependendencie just add it's name on one of that file (if it's backend, `requirements.txt` if it's frontend `package.json`).

The third thing to do is installing redis on your local machine for some task that need to run on your computer (sending emails, cache memory, etc...). Run

```bash
make install-redis
```

This will install redis on the `venv` folder and in your local machine.

Now let's make the migrations on the backend. The backend runs a `sqlite3` locally but in production this is a `postgresql`. This is because we don't want a postgresql server in every machine, so a `sqlite3` is, well... more lite (?). In order to do this, run:

```bash
make db-update
```

Now let's run the project, first we need to compress webpack on our project (Do this every time you delete your venv and/or your node_modules folder). To do this run the following commands:

```bash
cd frontend/
npm run dev
cd ../
```

To start the server we need an extra terminal all in our virtual environment (remember to always be on it to run the commands, if not your computer will suffer bad consequences).

First, run the redis server with the command:

```bash
make redis-run
```

On the other terminal, let's start django and react:

```bash
make run
```

And there we go. You have running the easyexam for the first time on your local computer!

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

To run unittest on your local machine, there is a make command:

```bash
make test
```

#### Reseting local database

**WARNING** This will reset your local database, so every data that you have introduce on it will dissapear. Run just if any problem is encountered.

To reset your local database and make a new one with new migrations do:

```bash
make reset
```

If you want to also reset redis with the backend:

```bash
make reset-full
```

Or if you just want to reset redis:

```bash
make redis-reset
```

#### Adding pre recorded data

On `fixtures` there are jsons with pre recorded data, to add them onto your database you can run:

```bash
make load-fixtures
```

This will add all pre recorded data, if a model change pls change the pre recorded data also.

##### Reset and loading pre recorded data

You can reset the database and load the pre recorded data with the command:

```bash
make reset-with-fixtures
```

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
