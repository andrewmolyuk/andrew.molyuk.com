.PHONY: build
build:
	hugo --gc --minify --cleanDestinationDir
	find public -type f -name '*.jpg' -delete
	find public -type f -name '*.png' -delete

.PHONY: dev
dev:
	hugo server --buildDrafts --buildFuture --disableFastRender --noHTTPCache  --navigateToChanged --templateMetricsHints --templateMetrics --verbose --watch --port 1313

.PHONY: convert
convert:
	cd ./content/post && ./convert-images.sh & cd ../..
