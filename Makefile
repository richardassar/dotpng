all: test

clean:
	rm -r test/bundle.js
	rm -r test/bundle.min.js

test: test/test_html.js
	browserify test/test_html.js -o test/bundle.js
	cat test/bundle.js | java -jar ~/closure-compiler/compiler.jar > test/bundle.min.js
	node test/test.js

.PHONY: test clean