.DEFAULT_GOAL: lint
.NOTPARALLEL:
.SILENT:

lint:
	npx markdownlint --fix "**/*.md" -i node_modules
	npx prettier --write "**/*.md" "**/*.json"
@PHONY: lint

dev: lint
	hugo server --buildDrafts --buildFuture --disableFastRender --noHTTPCache  --navigateToChanged --templateMetricsHints --templateMetrics --verbose --watch --port 1313
@PHONY: dev

clean:
	rm -rf public
	rm -rf resources
@PHONY: clean

build: clean
	hugo --gc --minify --cleanDestinationDir
.PHONY: build

update:
	hugo mod get -u ./...
	hugo mod tidy
	npx npm-check-updates -u
	npm install --no-fund --no-audit
@PHONY: update