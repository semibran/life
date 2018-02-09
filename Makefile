# GNU Make 3.8.2 and above

PATH := $(PATH):node_modules/.bin
SHELL := /bin/bash

.ONESHELL:
.SILENT:

all:
	rm -rf dist
	mkdir -p dist
	make js
	make css
	make html
	rm dist/script.js.map dist/style.css.map

js:
	rollup src/script.js -o dist/script.js -f iife -c -m
	babel dist/script.js --presets=env | uglifyjs -o dist/script.js -c -m

css:
	node-sass src/style.scss -o dist --source-map true --source-map-contents
	postcss dist/style.css -u autoprefixer -o dist/style.css -m
	cleancss dist/style.css -o dist/style.css --source-map --source-map-inline-sources

html:
	html-minifier --collapse-whitespace src/index.html -o dist/index.html

deploy: all
	gh-pages -d dist -m "updates"
