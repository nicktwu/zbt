setup:
	python generate-secret.py > secret
	printf "crypto_key=\"" > authentication/certificate/secret.py
	printf "var secret={crypto_key:\"" > backend/secrets.js
	cat secret | tr -d "\n" >> authentication/certificate/secret.py
	cat secret | tr -d "\n" >> backend/secrets.js
	printf "\"" >> authentication/certificate/secret.py
	printf "\"};\n module.exports=secret;" >> backend/secrets.js
	rm secret

start:
	cd authentication && make start
	cd backend && make start
