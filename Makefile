all: dist/dotpng.js dist/dotpng.min.js

dist:
	mkdir -p dist

dist/bundle.js: dist
	ender build --output dist/bundle.js

dist/dotpng.js: dist dist/bundle.js src/dotpng.js
	(cat dist/bundle.js; cat src/dotpng.js) > dist/dotpng.js

dist/dotpng.min.js: dist dist/dotpng.js
	cat dist/dotpng.js | java -jar ~/closure-compiler/compiler.jar > dist/dotpng.min.js

clean:
	rm -r dist

test:
	node test/test.js

.PHONY: test clean
