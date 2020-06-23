#!/bin/bash

function easyexam(){
    case "$1" in
    "install") pip install -r requirements.txt
               cd frontend/ && npm install && cd ..
                ;;
    "backend-install") pip install -r requirements.txt
                        ;;
    "frontend-install")  cd frontend/ && npm install && cd ..
                        ;;
    "makemigrations") python manage.py makemigrations
                      ;;
    "migrate") python manage.py migrate
                ;;
    "jupyter") echo "Running jupyter with django"
               python manage.py shell_plus --notebook
               ;;
    "run") cd frontend/ && npm run dev && cd ..
           python manage.py runserver 0.0.0.0:8000
           ;;
    "test") cd frontend/ && npm run test && cd ..
            python manage.py test -v 2 $2
            ;;
    "backend-test") python manage.py test -v 2 $2
                    ;;
    "fixtures") echo "Loading groups fixture"
                python manage.py loaddata fixtures/Group.json
                echo "Loading users fixture"
                python manage.py loaddata fixtures/Users.json
                echo "Loading topics fixture"
                python manage.py loaddata fixtures/Topics.json
                echo "Loading problems fixture"
                python manage.py loaddata fixtures/Problems.json
                ;;
    *)
	   echo "fixtures: Create initial data on your database to work with"
	   echo "jupyter: Run jupyter with django shell integrated"
	   echo "backend-test: Run all test of the backend"
	   echo "makemigrations: Make database migration on Django"
	   echo "migrate: Execute the migrations on Django"
	   echo "frontend-install: Install the dependencies of the frontend"
	   echo "frontend-configurate: Create configurations to start react on django"
	   echo "install: Install both project dependencies"
	   echo "run: Run backend with the latest frontend configuration"
	   echo "test: Test both projects unittest"
	   echo "reset: Make a clean of the project database"
	   echo "reset-with-fixtures: Reset the database and load the fixtures"
	   echo "reset-full: Make a full clean on the database and redis"
       ;;
    esac
}
