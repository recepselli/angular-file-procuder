import { CsvFileModel } from "../models/csv-file-model";
import { FileCreator } from "./file-creator";
import { FileModel } from "./models/file-model";

export class UnsupportedFileCreator extends FileCreator {
    extension: string = '';

    create(name: string, data: CsvFileModel[]): FileModel {
        throw new Error("File type is being supported yet.");
    }
}
