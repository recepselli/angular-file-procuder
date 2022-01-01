import { Component } from '@angular/core';
import { CsvFileModel } from './models/csv-file-model';
import { CsvFileSpecification } from './specifications/csv-file-specification';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  headerColumns: string[] = [];
  dataList: CsvFileModel[] = [];

  constructor(
    private papa: Papa,
    private csvFileSpecification: CsvFileSpecification
  ) { }

  onChange(files: FileList | null) {
    if (files) {
      this.papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.headerColumns = result.meta.fields;
          this.dataList = result.data.filter((r: CsvFileModel) => this.csvFileSpecification.isSatisfiedBy(r));
        },
      });
    }
  }
}
