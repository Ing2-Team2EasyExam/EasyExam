# EasyExam

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Developing locally
To develop on this project on your local machine (i.e your computer) you need to install
- Python 3.7
- [pre-commit](https://pre-commit.com/#install)

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

### Running the servers locally
There is a guide to run each frontend and backend server locally, follow that guides to run it on your local machines. A make file is made for running this commands automaticly, here is a resume of the important ones:

|Instruction| What happens  |
|-----------|---------------|
|create-environment| Creates a local virtual environment to run the backend |
| install | Install all frontend and backend dependencies |
| install-redis | Install redis on local machine with wget |
| backend-run | Runs local django server on local machine port `8000`|
| redis-run | Runs redis on local machine port `6369` |
| db-update | Runs makemigrations and migrate of django on backend |
| frontend-run | Runs local react server on local machine port `3000` |
| backend-test| Runs all unittest on the backend |
| frontend-test| Runs all unittest on the frontend |
| test | Runs all backend and frontend test |
| reset | Delete previous database and create a new one with no data on it|
| reset-full | Reset all db's and starts new ones |

For all commands descriptions type `make` on the command line for help



### Using jupyter
You can use jupyter on the backend if you want, to run it do:
```bash
make jupyter
```
And select django shell plus as interpreter

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
