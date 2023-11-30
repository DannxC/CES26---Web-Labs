import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogBoxComponent } from './log-box/log-box.component';

import { FormsModule } from '@angular/forms';   // My code


@NgModule({
  declarations: [
    AppComponent,
    LogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // My code
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
