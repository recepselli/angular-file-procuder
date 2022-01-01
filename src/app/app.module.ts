import { CsvFileSpecification, HasValidStartRate, HasValidURL, IsNameUTF_8 } from './specifications/csv-file-specification';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FileCreatorFactory } from './factory/file-creator-factory';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [CsvFileSpecification, IsNameUTF_8, HasValidURL, HasValidStartRate, FileCreatorFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
