setup-secret:
	python generate-secret.py > secret
	printf "crypto_key=\"" > authentication/certificate/secret.py
	printf "heroku config:set SECRET_KEY=" > production_secret
	printf "SECRET_KEY=" > backend/secret
	cat secret | tr -d "\n" >> authentication/certificate/secret.py
	cat secret | tr -d "\n" >> backend/secret
	cat secret | tr -d "\n" >> production_secret
	printf "\"" >> authentication/certificate/secret.py
	rm secret

setup: setup-secret

start-server:
	cd database && make start
	cd authentication && make start
	cd backend && make start

start: start-server

release: setup-secret
	cd authentication && make release
	git subtree push --prefix backend heroku master
	chmod +x production_secret
	./production_secret
	rm -rf authentication/certificate/secret.py
	rm -rf backend/secret
	rm -rf production_secret
	cd frontend && make release

quick-release:
	git subtree push --prefix backend heroku master
