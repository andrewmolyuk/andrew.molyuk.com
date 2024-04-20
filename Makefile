.DEFAULT_GOAL: lint
.NOTPARALLEL:
.SILENT:

lint:
	markdownlint **/*.md
@PHONY: lint

build:
	hugo --gc --minify --cleanDestinationDir
.PHONY: build

dev: lint
		hugo server --buildDrafts --buildFuture --disableFastRender --noHTTPCache  --navigateToChanged --templateMetricsHints --templateMetrics --verbose --watch --port 1313
@PHONY: dev

upgrade: 
	hugo mod get -u ./...
	hugo mod tidy
@PHONY: upgrade