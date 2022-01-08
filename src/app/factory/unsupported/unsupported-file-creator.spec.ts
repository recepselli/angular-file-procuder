import { TestBed } from "@angular/core/testing";
import { UnsupportedFileCreator } from "./unsupported-file-creator";

describe('UnsupportedFileCreator', () => {
    let service: UnsupportedFileCreator;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UnsupportedFileCreator]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(UnsupportedFileCreator);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should throw error when create method called', () => {
        expect(() => service.create('hotels', [])).toThrow(new Error("File type is being supported yet."))
    });
});
