import { CsvFileModel } from "../../models/csv-file-model";
import { FileCreator } from "../file-creator";
import { FileModel } from "../models/file-model";

export class XmlFileCreator extends FileCreator {
    extension: string = '.xml'
    create(name: string, data: CsvFileModel[]): FileModel {
        if (name === '' || data === undefined || data.length === 0) {
            return {} as FileModel;
        }

        const file: FileModel = {
            name: `${name}${this.extension}`,
            blob: new Blob([this.getXmlString(name, data)], { type: 'application/xml' })
        }
        return file;
    }

    private getXmlString(name: string, data: CsvFileModel[]): string {
        var xml = `<?xml version="1.0" encoding="UTF-8"?><${name}>`;
        data.forEach(d => {
            Object.entries(d).forEach(([key, value]) => xml += `<${key}>${value}</${key}>`)
        })
        xml += `</${name}>`;
        return xml;
    }
}
