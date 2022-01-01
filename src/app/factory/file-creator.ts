import { CsvFileModel } from "../models/csv-file-model";
import { FileModel } from "./models/file-model";
import { IFileSaver } from "./file-saver";
import { saveAs } from 'file-saver';

export interface IFileCreator {
    extension: string;
    create(fileName: string, data: CsvFileModel[]): FileModel;
}

export abstract class FileCreator implements IFileSaver, IFileCreator {
    save(fileName: string, data: CsvFileModel[]) {
        const file: FileModel = this.create(fileName, data);
        saveAs(file.blob, file.fileName);
    }

    abstract extension: string;
    abstract create(fileName: string, data: CsvFileModel[]): FileModel;
}