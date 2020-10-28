# Getting Started with Error Monitoring for Angular

## Pre-Installation Directions: Setup and deploy angular app

1. Be sure to have node, NVM, and git installed.

2. Fork this repository and clone. Set node version as specified:
```
git clone https://github.com/<your_fork>/ng-conf-sample-app
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
5. Verify web server is running properly and app can be loaded (go to http://localhost:5000 in the browser and trigger errors)

6. You should be set for the workshop, where you will add Sentry into this angular application to monitor errors.


## Setup Sentry + install SDK
1. Go to https://sentry.io/signup + 'create your account'.

2. Follow onboarding steps (select angular project) and instrument code as specified. 

3. Then build and run server with
```
npm deploy
```
4. Go to http://localhost:5000 and trigger errors. The Sentry onboarding (part-3) should note that event was successfully. Follow link to event in Sentry.io.

### Upload source maps (so we can see actual names and stacktraces)
1. Specify `release` in Sentry SDK
```
Sentry.init({
    ...,
    release: environment.release
})
```

2. Install sentry-cli to upload sourcemaps
```
npm install --save @sentry/cli
```

3. Create production bundles and sourcemaps
```
# In angular.json, this is already done. Checkout source maps at dist/
"sourceMap": true
```

4. In Makefile, remove placeholder `setup_release` and uncomment actual one (which is calling `upload_sourcemaps`).

5. Create 'New Internal Integration' to obtain AUTH_TOKEN.
> _Organization Settings -> Developer Settings -> 'New Internal Integration'_

> **_NOTE:_**  `Relases: Admin` permission is needed

6. Specify SENTRY_AUTH_TOKEN as environment variable
```
export SENTRY_AUTH_TOKEN=<YOUR_AUTH_TOKEN>
```

7. Specify `SENTRY_ORG` and `SENTRY_PROJECT` accordingly in Makefile

8. Run build/deploy:
```
npm run deploy
```
Verify Source Maps are uploaded

> _Project Settings -> Source Maps_

9. Trigger new errors (http://localhost:5000) and verify filename/stacktrace


## Sentry Performance
1. Head over to `Performance` on left hand side

2. Drill down on transaction to view distributed trace


## Integrations

### Slack (alerting/nofication)
1. Enable Business Trial (to enable integrations + full feature set)
> _Organization Settings -> Subscription -> 'Activate Your Trial'_

2. Add Slack integration
> _Organization Settings -> Integrations -> Slack_

3. Specify in alert rule

4. Trigger error and verify alert

### GitHub
1. Add GitHub integration
> _Organization Settings -> Integrations -> GitHub_

2. Add `associate_commits` to `setup_release` in Makefile

3. Run build/deploy + trigger errors
```
npm run deploy
```
Go to http://localhost:5000 + click on errors

4. Pull up error/issue on Sentry. You should see 'Suspect Commit' and 'Suggested Assignee'

# Notes
In case you get lost, the working code can be found in the `final-state` branch (https://github.com/ndmanvar/ng-conf-2020-sentry-workshop/tree/final-state)
