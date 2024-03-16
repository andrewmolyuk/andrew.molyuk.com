.PHONY: build
build:
	hugo --gc --minify --cleanDestinationDir
	
.PHONY: dev
dev:
	hugo server --buildDrafts --buildFuture --disableFastRender --noHTTPCache  --navigateToChanged --templateMetricsHints --templateMetrics --verbose --watch --port 1313

.PHONY: convert
convert:
	cd ./content/post && ./convert-images.sh &&  find . -type f -name '*.jpg' -delete && find . -type f -name '*.png' -delete && cd ../..
