.PHONY: build
build:
	hugo --gc --minify --cleanDestinationDir

.PHONY: dev
dev:
	hugo server --buildDrafts --buildFuture --disableFastRender --noHTTPCache  --navigateToChanged --templateMetricsHints --templateMetrics --verboseLog --verbose --watch --port 1313

.PHONY: lint
lint:
	remark . --quiet --frail
	eslint .
