all: dist/bitster.js dist/bitster.min.js

dist:
	mkdir -p dist

dist/bitster.js: dist src/header.js src/bitster.js src/footer.js utils/generateNamespace.js
	@echo "Building bitster.js"
	(cat src/header.js; node utils/generateNamespace.js; cat src/bitster.js; cat src/footer.js) > dist/bitster.js

dist/bitster.min.js: dist dist/bitster.js
	@echo "Building bitster.min.js"
	cat dist/bitster.js | java -jar ~/closure-compiler/compiler.jar > dist/bitster.min.js

clean:
	rm -rf dist/

test: dist/bitster.min.js
	@./node_modules/.bin/mocha --reporter spec -u tdd

.PHONY: test clean
