import { CsvFileModel } from "src/app/models/csv-file-model";
import { FileCreator } from "../file-creator";
import { FileModel } from "../models/file-model";

export class JsonFileCreator extends FileCreator {
    extension: string = '.json'
    create(name: string, data: CsvFileModel[]): FileModel {
        if (!name || !data?.length) {
            return {} as FileModel;
        }

        const file: FileModel = {
            name: `${name}${this.extension}`,
            blob: new Blob([JSON.stringify(data)], { type: 'application/json' })
        }

        return file;
    }
}
