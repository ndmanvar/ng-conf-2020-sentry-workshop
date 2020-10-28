import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { environment } from './../environments/environment.prod';
import { Integrations } from "@sentry/tracing";

import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "https://6dd6b79934654822b631951be27ec0e1@o87286.ingest.sentry.io/1190123",
  release: environment.release,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost", "http://localhost/5000"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

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
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(trace: Sentry.TraceService) {}
}
