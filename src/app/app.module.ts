import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {DataEntryService} from './common/services/data-entry.service';
import {AppRoutingModule} from './app.routing.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TimetrackingModule} from './components/timetracking/timetracking.module';
import {NgbDateCustomParserFormatter} from "./common/reactive-form/dynamic-form-question/dateFormat";


registerLocaleData(localeDeCh);
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TimetrackingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-CH'},
    DataEntryService, {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
