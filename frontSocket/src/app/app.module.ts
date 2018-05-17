import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SportComponent } from './sport/sport.component';
import { WebsocketService } from './websocket.service';
import { SportService } from './sport.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    SportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SportService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
