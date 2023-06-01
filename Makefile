.PHONY: build
build:
	hugo --gc --minify --cleanDestinationDir
	find public/blog -type f -name '*.jpg' -delete
	find public/blog -type f -name '*.png' -delete

.PHONY: dev
dev:
	hugo server --buildDrafts --buildFuture --disableFastRender --noHTTPCache  --navigateToChanged --templateMetricsHints --templateMetrics --verboseLog --verbose --watch --port 1313

.PHONY: lint
lint:
	npx remark . --quiet --frail
	npx eslint "**/*.js" --quiet
	npx stylelint "**/*.{css,scss}" --quiet
