# Getting Started with Error Monitoring for Angular

## Pre-Installation Directions: Setup and deploy angular app

1. Be sure to have Node, NVM, and git installed.

2. fork lone this repository with
```
git clone https://github.com/ndmanvar/ng-conf-sample-app
nvm use
```
3. Then install with
```
npm install
```
4. Then build and run server with
```
npm deploy
```
5. Verify web server is running properly and app can be loaded (go to http://localhost:5000 in the browser)

6. You should be set for the workshop, where you will add Sentry into this angular application to monitor errors.


## Setup Sentry + install Sentry SDK
1. Go to https://sentry.io/signup + 'create your account'.
2. Follow onboarding steps (select angular project) and instrument code as specified. Helps to have `npm start` running for live reloading
3. Verify event shot to Sentry (in onboarding instructions) and take a look at issue

### Sourcemaps (so we can see actual names and stacktraces)
1. Install sentry-cli to upload sourcemaps
```
npm install --save @sentry/cli

```

2. Create production bundles and sourcemaps
```
# In angular.json, this is already done
"sourceMap": true
```
```
#  To produce production bundle and source maps
npm run deploy
```

3. In Makefile, remove placeholder `setup_release` and uncomment actual one (which is calling `upload_sourcemaps`).

4. Create 'New Internal Integration' to obtain AUTH_TOKEN.
> Organization Settings -> Developer Settings -> 'New Internal Integration'


5. Specify SENTRY_AUTH_TOKEN as environment variable
```
export SENTRY_AUTH_TOKEN=<YOUR_AUTH_TOKEN>
```

6. Specify `SENTRY_ORG` and `SENTRY_PROJECT` accordingly in Makefile

7. Run build/deploy:
```
npm run deploy
```
Verify Source Maps are uploadedProject Settings -> Source Maps).

8. Trigger new errors (http://localhost:5000) and verify filename/stacktrace



## Sentry Performance
1. Head over to `Performance` on left hand side
2. Drill down on transaction to view distributed trace


## Integrations

### Slack (alerting/nofication)
1. Organization Settings -> Integrations -> Slack
2. Specify in alert rule
3. Trigger error and verify alert

### GitHub
1. Head over to the GitHub Integration:
> Organization Settings -> Integrations -> GitHub

2. Add `associate_commits` to `setup_release` in Makefile

3. Run build/deploy + trigger errors
```
npm run deploy
```
http://localhost:5000

4. Pull up error/issue on Sentry. You should see 'Suspect Commit' and 'Suggested Assignee'

