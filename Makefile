.DEFAULT_GOAL := help
django := python3 manage.py
frontend := frontend/
backend := apps/
user_fixture := fixtures/Users.json
topics_fixture := fixtures/Topics.json
groups_fixture := fixtures/Group.json
problem_fixture := fixtures/Problems.json


help:
	@echo "create-environment: Create virtual environment with name venv"
	@echo "ubuntu-node: download nodejs and yarn on ubuntu, if not using it check the web"
	@echo "fedora-node: download nodejs and yarn on fedora, if not using it check the web"
	@echo "brew-node: download nodejs and yarn on macOS, if not using mac check the web"
	@echo "ubuntu-latex: download pdflatex compiler on ubuntu, if not using it check the web"
	@echo "fedora-latex: download pdflatex compiler on fedora, if not using it check the web"
	@echo "brew-latex: download pdflatex compiler on macOS, if not using mac check the web"
	@echo "redis-install: Install redis on your computer, need to have wget command"
	@echo "redis-run: Run the redis server on your computer"
	@echo "redis-reset: Drop the data on the redis database"
	@echo "load-fixtures: Create initial data on your database to work with"
	@echo "backend-run: Run Django local server, without running webpack before"
	@echo "jupyter: Run jupyter with django shell integrated"
	@echo "db-delete: Delete Django local database, deleting all the local data"
	@echo "backend-install: Run the installation of the requirements file on the environment"
	@echo "backend-test: Run all test of the backend"
	@echo "makemigrations: Make database migration on Django"
	@echo "migrate: Execute the migrations on Django"
	@echo "db-update: Runs makemigrations and migrate at once"
	@echo "frontend-install: Install the dependencies of the frontend"
	@echo "frontend-configurate: Create configurations to start react on django"
	@echo "install: Install both project dependencies"
	@echo "run: Run backend with the latest frontend configuration"
	@echo "test: Test both projects unittest"
	@echo "reset: Make a clean of the project database"
	@echo "reset-with-fixtures: Reset the database and load the fixtures"
	@echo "reset-full: Make a full clean on the database and redis"

create-environment:
	@python3 -m venv venv

ubuntu-node:
	sudo apt install nodejs
	sudo apt install npm
	sudo apt install yarn

fedora-node:
	sudo dnf install nodejs
	sudo dnf install npm
	sudo dnf install yarnpkg


brew-node:
	brew install node
	brew install yarn

ubuntu-latex:
	@echo "Installing pdflatex this may take a while..."
	sudo apt-get install texlive-latex-base
	sudo apt-get install texlive-fonts-recommended
	sudo apt-get install texlive-fonts-extra
	sudo apt-get install texlive-latex-extra

fedora-latex:
	@echo "Installing pdflatex this may take a while..."
	sudo dnf install texlive-scheme-full

brew-latex:
	@echo "Installing pdflatex this may take a while..."
	brew cask install mactex

makemigrations:
	@${django} makemigrations


migrate:
	@${django} migrate


backend-run:
	@echo "Setting up backend server"
	@${django} runserver


jupyter:
	@echo "Running jupyter with django"
	@${django} shell_plus --notebook

load-fixtures:
	@echo "Loading groups fixture"
	@${django} loaddata ${groups_fixture}
	@echo "Loading users fixture"
	@${django} loaddata ${user_fixture}
	@echo "Loading topics fixture"
	@${django} loaddata ${topics_fixture}
	@echo "Loading problem fixture"
	@${django} loaddata ${problem_fixture}

db-delete:
	@echo "Removing local database..."
	@rm EasyExamAPI/db.sqlite3
	@echo "Removing migrations..."
	@find ${backend} -path "*/migrations/*.py" -not -name "__init__.py" -delete
	@find ${backend} -path "*/migrations/*.pyc" -delete


backend-install:
	@python3 -m pip install --upgrade pip
	@python3 -m pip install wheel
	@python3 -m pip install -r requirements.txt

frontend-install:
	@cd frontend/ && npm install

backend-test:
	@${django} test ${backend} -v 2
frontend-test:
	@cd ${frontend} && npm run test

frontend-configurate:
	@cd ${frontend} && npm run dev

install-redis:
	@wget http://download.redis.io/redis-stable.tar.gz
	@tar xvzf redis-stable.tar.gz
	@rm redis-stable.tar.gz
	@mv redis-stable venv/
	@cd venv/redis-stable && make install


redis-run:
	redis-server


redis-reset:
	redis-cli FLUSHALL


install: backend-install frontend-install

db-update: makemigrations migrate

run: frontend-configurate backend-run

test: frontend-test backend-test


reset: db-delete db-update


reset-full: reset redis-reset

reset-with-fixtures: reset load-fixtures
#deploy commands on the make file for future use

build-django:
	@uwsgi --http localhost:8000 --wsgi-file EasyExamAPI/wsgi.py --static-map /static=./static &
