import { Component } from '@angular/core';
import { CsvFileModel } from './models/csv-file-model';
import { CsvFileSpecification } from './specifications/csv-file-specification';
import { FileCreatorFactory } from './factory/file-creator-factory';
import { Papa } from 'ngx-papaparse';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    headerColumns: string[] = [];
    dataList: CsvFileModel[] = [];
    private fileName: string = '';

    constructor(
        private papa: Papa,
        private csvFileSpecification: CsvFileSpecification,
        private fileCreatorFactory: FileCreatorFactory
    ) { }

    onChange(files: FileList | null) {
        if (files) {
            this.papa.parse(files[0], {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    this.fileName = files[0].name.split('.')[0];
                    this.headerColumns = result.meta.fields;
                    this.dataList = result.data.filter((r: CsvFileModel) => this.csvFileSpecification.isSatisfiedBy(r));
                },
            });
        }
    }

    produceFile(fileType: string) {
        if (this.dataList.length == 0) {
            alert('Please load csv file first');
            return;
        }

        this.createFile(fileType, this.fileName, this.dataList);
    }

    private createFile(fileType: string, fileName: string, csvFileModel: CsvFileModel[]) {
        this.fileCreatorFactory.createInstance(fileType).save(fileName, csvFileModel);
    }
}
