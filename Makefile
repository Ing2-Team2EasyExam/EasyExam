.DEFAULT_GOAL := help
django := python3 manage.py
frontend := frontend/
backend := apps/
help:
	@echo "create-environment: Create virtual environment with name venv"
	@echo "ubuntu-node: download nodejs and yarn on ubuntu, if not using it check the web"
	@echo "brew-node: download nodejs and yarn on macOS, if not using mac check the web"
	@echo "makemigration: Make database migration on Django"
	@echo "migrate: Execute the migrations on Django"
	@echo "backend-run: Run Django local server"
	@echo "jupyter: Run jupyter with django shell integrated"
	@echo "backend-db-delete: Delete Django local database, deleting all the local data"
	@echo "backend-install: Run the installation of the requirements file on the environment"
	@echo "backend-test: Run all test of the backend"
	@echo "frontend-run: Put the front end server up on local machine on port 3000"
	@echo "frontend-install: Install the dependencies of the frontend"
	@echo "frontend-test: Runs all the test on the frontend"
	@echo "redis-install: Install redis on your computer, need to have wget command"
	@echo "redis-run: Run the redis server on your computer"
	@echo "redis-reset: Drop the data on the redis database"
	@echo "install: Install both project dependencies"
	@echo "test: Test both projects unittest"
	@echo "db-update: Runs makemigration and migrate at once"
	@echo "reset: Make a clean of the project database"
	@echo "reset-full: Make a full clean on the database and redis"


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


create-environment:
	@python3 -m venv venv


makemigration:
	@${django} makemigrations


migrate:
	@${django} migrate


backend-run:
	@echo "Setting up backend server"
	@${django} runserver


jupyter:
	@echo "Running jupyter with django"
	@${django} shell_plus --notebook


backend-db-delete:
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
	@${django} test ${backend}


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

db-update: makemigration migrate

run: frontend-configurate backend-run

test: backend-test


reset: backend-db-delete db-update


reset-full: reset redis-reset


#deploy commands on the make file for future use

build-django:
	@uwsgi --http localhost:8000 --wsgi-file EasyExamAPI/wsgi.py --static-map /static=./static &
