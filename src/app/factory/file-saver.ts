import { CsvFileModel } from "../models/csv-file-model";

export interface IFileSaver {
    save(name: string, data: CsvFileModel[]): void;
}