.PHONY: build
build:
	hugo --gc --minify --cleanDestinationDir
	find public -type f -name '*.jpg' -delete
	find public -type f -name '*.png' -delete

.PHONY: dev
dev:
	hugo server --buildDrafts --buildFuture --disableFastRender --noHTTPCache  --navigateToChanged --templateMetricsHints --templateMetrics --verbose --watch --port 1313

.PHONY: lint
lint:
	npx remark . --quiet --frail
	npx eslint "**/*.js" --quiet
	npx stylelint "**/*.{css,scss}" --quiet

.PHONY: lint
convert:
	cd ./content/blog && ./convert-images.sh & cd ../..
