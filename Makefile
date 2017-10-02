setup-secret:
	python generate-secret.py > secret
	printf "crypto_key=\"" > authentication/certificate/secret.py
	printf "var secret={crypto_key:\"" > backend/secrets.js
	printf "heroku config:set SECRET_KEY=" > production_secret
	cat secret | tr -d "\n" >> authentication/certificate/secret.py
	cat secret | tr -d "\n" >> backend/secrets.js
	cat secret | tr -d "\n" >> production_secret
	printf "\"" >> authentication/certificate/secret.py
	printf "\"};\nmodule.exports=secret;" >> backend/secrets.js
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
	rm -rf backend/secrets.js
	rm -rf production_secret

