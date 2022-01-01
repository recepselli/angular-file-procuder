import { CsvFileModel } from "../models/csv-file-model";

export interface IFileSaver {
    save(fileName: string, data: CsvFileModel[]): void;
}