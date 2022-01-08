import { FileCreatorFactory } from "./file-creator-factory";
import { TestBed } from "@angular/core/testing";
import { UnsupportedFileCreator } from "./unsupported/unsupported-file-creator";
import { XmlFileCreator } from "./xml/xml-file-creator";

describe('FileCreatorFactory', () => {
    let service: FileCreatorFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FileCreatorFactory]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(FileCreatorFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return XmlFileCreator when xml string passed to createInstance method', () => {
        expect(service.createInstance('xml')).toBeInstanceOf(XmlFileCreator);
    });

    it('should return UnsupportedFileCreator when unsupported type passed to createInstance method', () => {
        expect(service.createInstance('ssss')).toBeInstanceOf(UnsupportedFileCreator)
    });
});
