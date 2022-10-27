build:
	(cd devops && DOCKER_BUILDKIT=0 docker compose build)

up:
	(cd devops && docker compose up --build)

down:
	(cd devops && docker compose down)