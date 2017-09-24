build:
	docker build -t auth .

start: stop build
	docker run -d --rm --name auth -p 3002:5555 auth

stop:
	-docker stop auth
