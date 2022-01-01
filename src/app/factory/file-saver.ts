import { CsvFileModel } from "../models/csv-file-model";

export interface IFileSaver {
    saveFile(fileName: string, data: CsvFileModel[]): void;
}