.DEFAULT_GOAL := help
django := python3 backend/manage.py

help:
	@echo "create-environment: Create virtual environment with name venv"
	@echo "up-environment: Launch the virtual environment on the console"
	@echo "ubuntu-node: download node on ubuntu, if not using it check the web"
	@echo "makemigration: Make database migration on Django"
	@echo "migrate: Execute the migrations on Django"
	@echo "backend-up: Run Django local server"
	@echo "jupyter: Run jupyter with django shell integrated"
	@echo "backend-db-delete: Delete Django local database, deleting all the local data"
	@echo "backend-install: Run the installation of the requirements file on the environment"
	@echo "backend-test: Run all test of the backend"
	@echo "install: Install both project dependencies"
	@echo "test: Test both projects unittest"
	@echo "reset: Make a full clean of the project data"

ubuntu-node:
	@sudo apt install nodejs
	@sudo apt install npm
create-environment:
	@python3 -m venv venv
makemigration:
	@${django} makemigrations
migrate:
	@${django} migrate
backend-up:
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
	@cd frontend/
	@npm start
frontend-install:
	@cd frontend/
	@npm install
	@cd ../
frontend-test:
	@cd frontend/
	@npm test
	@cd ../
install: backend-install frontend-install
test: backend-test frontend-test
reset: backend-db-delete backend-install makemigration migrate
