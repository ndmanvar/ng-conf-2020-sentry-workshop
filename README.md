# Getting Started with Error Monitoring for Angular

## Pre-Installation Directions: Setup and deploy angular app

1. Be sure to have Node, NVM, and git installed.

2. fork lone this repository with
```
git clone https://github.com/ndmanvar/ng-conf-sample-app
```
3. Then install with
```
nvm use
npm install
```
4. Then build and run server with
```
npm deploy
```
5. Verify web server is running properly and app can be loaded (go to `http://localhost:3000` in the browser)

6. You should be set for the workshop, where you will add Sentry into application to monitor errors.


## Setup Sentry + install Sentry SDK
1. go to https://sentry.io/signup + 'create your account'.
2. Follow onboarding steps (select angular project) and instrument code as specified. Helps to have `npm start` running for live reloading
3. Verify event shot to Sentry (in onboarding instructions) and take a look at issue

### Sourcemaps (so we can see actual names and stacktraces)
1. `npm install --save @sentry/cli
2. `npm run deploy` to produce production bundle and source maps
2. Uncomment `setup_release` in Makefile and remove placeholder one. See `upload_sourcemaps` command.
3. Create 'New Internal Integration' to obtain AUTH_TOKEN. Organization Settings -> Developer Settings -> 'New Internal Integration'
4. Specify SENTRY_AUTH_TOKEN as environment variable
```
export SENTRY_AUTH_TOKEN=XYZ
```
5. Specify SENTRY_ORG and SENTRY_PROJECT accordingly in Makefile
6. `npm run deploy`. Verify Sourcemaps should be uploaded. Trigger new errors and verify filename/stacktrace

## Sentry Performance
1. Head over to `Performance` on left hand side
2. Drill down on transaction to view distributed trace

## Integrations

### Slack (alerting/nofication)
1. Organization Settings -> Integrations -> Slack
2. Specify in alert rule
3. Trigger error and verify alert

### GitHub
1. Organization Settings -> Integrations -> Slack
2. Add `associate_commits` to `setup_release` in Makefile
3. Run `npm run deploy`
4. Pull up error/issue on Sentry. You should see 'Suspect Commit' and 'Suggested Assignee'

