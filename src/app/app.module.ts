import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { environment } from './../environments/environment.prod';
import { Integrations } from "@sentry/tracing";

import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "https://4dd95bd3b553409cb6954626f4af6700@o468110.ingest.sentry.io/5495543",
  integrations: [new Integrations.BrowserTracing({
      tracingOrigins: [
        "localhost", "https://yourserver.io/api"
      ],
      routingInstrumentation: Sentry.routingInstrumentation
    })],

  // We recommend adjusting this value in production, or using tracesSampler for
  // finer control
  tracesSampleRate: 1.0
});

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot([
          { path: '', component: AppComponent },
  ])],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    }, {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
