module github.com/hugo-porto/web

go 1.22

// Direct link to the theme module in the local file system to deveopment purposes only
// Should be removed or commented before deploying to production
// replace github.com/hugo-porto/theme => ../theme

// Another way to do this is to use the HUGO_MODULE_REPLACEMENTS environment variable
// export HUGO_MODULE_REPLACEMENTS="github.com/hugo-porto/theme->../../theme"

require github.com/hugo-porto/theme v0.0.8 // indirect
