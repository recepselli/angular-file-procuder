import { CsvFileModel } from "../models/csv-file-model";
import { FileModel } from "./models/file-model";
import { IFileSaver } from "./file-saver";
import { saveAs } from 'file-saver';

export interface IFileCreator {
    extension: string;
    create(name: string, data: CsvFileModel[]): FileModel;
}

export abstract class FileCreator implements IFileSaver, IFileCreator {
    save(name: string, data: CsvFileModel[]) {
        if (!name) {
            throw new Error('Name cannot be null.');
        }

        if (!data?.length) {
            throw new Error('Data cannot be null.');
        }

        const file: FileModel = this.create(name, data);
        saveAs(file.blob, file.name);
    }

    abstract extension: string;
    abstract create(name: string, data: CsvFileModel[]): FileModel;
}
