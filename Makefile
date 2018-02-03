# GNU Make 3.8.2 and above

PATH := $(PATH):node_modules/.bin
SHELL := /bin/bash

.ONESHELL:
.SILENT:

all:
	rm -rf dist
	mkdir -p dist
	rollup src/script.js -o dist/script.js -f iife -c
	babel dist/script.js --presets=env | uglifyjs -o dist/script.js -c -m
	postcss src/style.css -u autoprefixer | cleancss -o dist/style.css
	html-minifier --collapse-whitespace src/index.html -o dist/index.html

deploy: all
	gh-pages -d dist -m "updates"
