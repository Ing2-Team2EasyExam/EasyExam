.DEFAULT_GOAL := help

help:
	@echo "docker-build: Create the docker image"
	@echo "docker-up: Mount the image and give you a bash to use on it"
	@echo "docker-stop: Stop the image of the container"
	@echo "docker-down: Stop the image and remove the container"
	@echo "docker-prune: Eliminate non used images"
	@echo "docker-reset: Stop the current image, eliminate de non used images and then build the container again"

#deploy commands on the make file for future use

build-django:
	@uwsgi --http localhost:8000 --wsgi-file EasyExamAPI/wsgi.py --static-map /static=./static &

docker-build:
	@docker-compose build web

docker-run:
	@docker-compose up -d
docker-celery:
	@docker-compose build celery
docker-up: docker-run
	@docker exec -it easyexam_web_1 /bin/bash

docker-stop:
	@docker-compose stop

docker-down:
	@docker-compose down

docker-prune:
	@docker system prune -a

docker-production-reset: docker-down docker-build docker-celery docker-run
docker-reset: docker-down docker-prune docker-build
