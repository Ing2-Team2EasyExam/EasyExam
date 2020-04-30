.DEFAULT_GOAL := help
django := python3 backend/manage.py

help:
	@echo "create-environment: Create virtual environment with name venv"
	@echo "ubuntu-node: download node on ubuntu, if not using it check the web"
	@echo "makemigration: Make database migration on Django"
	@echo "migrate: Execute the migrations on Django"
	@echo "backend-up: Run Django local server"
	@echo "jupyter: Run jupyter with django shell integrated"
	@echo "backend-db-delete: Delete Django local database, deleting all the local data"
	@echo "backend-install: Run the installation of the requirements file on the environment"
	@echo "backend-test: Run all test of the backend"
	@echo "frontend-run: Put the front end server up on local machine on port 3000"
	@echo "frontend-install: Install the dependencies of the frontend"
	@echo "frontend-test: Runs all the test on the frontend"
	@echo "install: Install both project dependencies"
	@echo "test: Test both projects unittest"
	@echo "db-update: Runs makemigration and migrate at once"
	@echo "reset: Make a full clean of the project data"
ubuntu-node:
	sudo apt install nodejs
	sudo apt install npm
	sudo apt install yarn
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
	@echo "Flushing Django..."
	@${django} flush
	@echo "Removing migrations..."
	@find . -path "backend/*/migrations/*.py" -not -name "__init__.py" -delete
	@find . -path "backend/*/migrations/*.pyc" -delete
	@echo "Removing local database..."
	@rm backend/EasyExamAPI/db.sqlite3
backend-install:
	@python3 -m pip install --upgrade pip
	@python3 -m pip install wheel
	@python3 -m pip install -r requirements.txt
backend-test:
	@${django} test
frontend-run:
	@cd frontend/ && yarn start
frontend-install:
	@cd frontend/ && yarn install
frontend-test:
	@cd frontend/ && yarn test

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
test: backend-test frontend-test
reset: backend-db-delete backend-install makemigration migrate
reset-full: reset redis-reset
