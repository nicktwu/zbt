prod-build:
	yarn build

release: prod-build
	scp -r build/* nwu@athena.dialup.mit.edu:/mit/zbt/web_scripts/todo
