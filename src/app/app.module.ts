import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { environment } from './../environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot([
          { path: '', component: AppComponent },
  ])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
