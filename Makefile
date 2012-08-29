all: test

clean:
	@rm \
		test/bundle.js \
		test/bundle.min.js \
		test/output.png

test: test/test_html.js
	@browserify test/test_html.js -o test/bundle.js
	@cat test/bundle.js | java -jar ~/closure-compiler/compiler.jar --language_in=ECMASCRIPT5 > test/bundle.min.js
	@node test/test.js

.PHONY: test clean