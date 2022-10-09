IMAGE_NAME=run-react-image

build:
	DOCKER_BUILDKIT=1 docker build \
		--build-arg USER_NAME=user \
		--build-arg USER_UID=$(shell id -u) \
		--build-arg USER_GID=$(shell id -g)  \
		-f devops/Dockerfile \
		-t ${IMAGE_NAME} .

up:
	(cd devops && docker compose up)