# Must have `sentry-cli` installed globally
# Following variable must be passed in
#  SENTRY_AUTH_TOKEN

SENTRY_ORG=testorg-az
SENTRY_PROJECT=ng-demo
PREFIX=dist
SENTRY_CLI=./node_modules/.bin/sentry-cli
VERSION=`$(SENTRY_CLI) releases propose-version`

# setup_release:
# 	echo "TODO: <PLACEHOLDER>"

setup_release: create_release upload_sourcemaps

create_release:
	$(SENTRY_CLI) releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	-$(SENTRY_CLI) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --local $(VERSION)

upload_sourcemaps:
	$(SENTRY_CLI) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps --url-prefix "~/" --rewrite --validate $(PREFIX)

create_env:
	@echo "version=${VERSION}" > .env
