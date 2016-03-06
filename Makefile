MAIN = client/main.js
BUNDLE = bundle.js
DIST = dist
FILES = $(DIST)/jspm_packages/system.js $(DIST)/jspm.browser.js $(DIST)/jspm.config.js $(DIST)/index.html

all: $(FILES) $(DIST)/$(BUNDLE)

$(FILES): $(DIST)/%: %
	test -e $@ || (mkdir -p $@ && rmdir $@)
	cp -r $< $@

$(DIST)/$(BUNDLE): jspm.browser.js jspm.config.js jspm_packages/* client/*
	jspm bundle $(MAIN) $(DIST)/$(BUNDLE) --skip-source-maps --minify

clean: $(DIST)
	rm -r $(DIST)
