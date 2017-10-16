build:
	docker build -t auth .

start: stop build
	docker run -d --rm --name auth -p 3002:5555 auth

stop:
	-docker stop auth


# change the username to your kerberos
release:
	scp -r certificate/* nwu@athena.dialup.mit.edu:/mit/zbt/web_scripts/authentication2/certificate
