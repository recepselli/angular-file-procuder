import { IFileSaver } from "./file-saver";
import { JsonFileCreator } from "./json/json-file-creator";
import { UnsupportedFileCreator } from "./unsupported/unsupported-file-creator";
import { XmlFileCreator } from "./xml/xml-file-creator";

export class FileCreatorFactory {
    private _fileTypes: Map<string, IFileSaver> = new Map<string, IFileSaver>();

    constructor() {
        this._fileTypes.set('json', new JsonFileCreator);
        this._fileTypes.set('xml', new XmlFileCreator);
    }

    createInstance(fileType: string): IFileSaver {
        if (!this._fileTypes.has(fileType.toLowerCase())) {
            return new UnsupportedFileCreator();
        }

        return this._fileTypes.get(fileType) as IFileSaver;
    }
}
