import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ExcelServiceService } from './services/excel-service.service';

import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@NgModule({
  imports: [BrowserModule,BrowserAnimationsModule, FormsModule, NgxGraphModule,HttpClientModule],
  declarations: [AppComponent, HelloComponent],
  providers: [ExcelServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}


