import { CsvFileModel } from "../models/csv-file-model";
import { FileCreator } from "./file-creator";
import { FileModel } from "./models/file-model";

export class XmlFileCreator extends FileCreator {
    extension: string = '.xml'
    create(fileName: string, data: CsvFileModel[]): FileModel {
        const file: FileModel = {
            fileName: fileName + this.extension,
            blob: new Blob([this.getXmlString(fileName, data)], { type: 'application/xml' })
        }
        return file;
    }

    private getXmlString(fileName: string, data: CsvFileModel[]): string {
        var xml = `<?xml version="1.0" encoding="UTF-8"?><${fileName}>`;
        data.forEach(d => {
            Object.entries(d).forEach(([key, value]) => xml += `<${key}>${value}</${key}>`)
        })
        xml += `</${fileName}>`;
        return xml;
    }
}
