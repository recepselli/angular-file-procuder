import { IFileSaver } from "./file-saver";
import { JsonFileCreator } from "./json-file-creator";
import { UnsupportedFileCreator } from "./unsupported-file-creator";
import { XmlFileCreator } from "./xml-file-creator";

export class FileCreatorFactory {
    private _fileTypes: Map<string, IFileSaver> = new Map<string, IFileSaver>();

    constructor() {
        this._fileTypes.set('json', new JsonFileCreator)
        this._fileTypes.set('xml', new XmlFileCreator)
    }

    createInstance(fileType: string): IFileSaver {
        if (!this._fileTypes.has(fileType)) {
            return new UnsupportedFileCreator();
        }

        return this._fileTypes.get(fileType) as IFileSaver;
    }
}