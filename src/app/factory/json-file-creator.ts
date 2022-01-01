import { CsvFileModel } from "../models/csv-file-model";
import { FileCreator } from "./file-creator";
import { FileModel } from "./models/file-model";

export class JsonFileCreator extends FileCreator {
    extension: string = '.json'
    create(fileName: string, data: CsvFileModel[]): FileModel {
        const file: FileModel = {
            fileName: fileName + this.extension,
            blob: new Blob([JSON.stringify(data)], { type: 'application/json' })
        }
        return file;
    }
}
