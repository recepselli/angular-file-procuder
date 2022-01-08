import { CsvFileModel } from "../../models/csv-file-model";
import { TestBed } from "@angular/core/testing";
import { XmlFileCreator } from "./xml-file-creator";

describe('XmlFileCreator', () => {
    let service: XmlFileCreator;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [XmlFileCreator]
        });
    })

    beforeEach(() => {
        service = TestBed.inject(XmlFileCreator);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return file model when create method called', () => {
        let name: string = 'hotels';
        let data: CsvFileModel[] = [];

        data.push({
            name: 'Selli Hotel',
            address: 'Prague',
            contact: 'Recep Selli',
            phone: '+420000000',
            stars: 5,
            uri: 'www.sellihotel.com'
        } as CsvFileModel);

        let xml = `<?xml version="1.0" encoding="UTF-8"?><hotels><name>Selli Hotel</name><address>Prague</address><stars>5</stars><contact>Recep Selli</contact><phone>+420000000</phone><uri>www.sellihotel.com</uri></hotels>`;
        let expectedBlob = new Blob([xml], { type: 'application/xml' });

        let result = service.create(name, data);

        expect(result.name).toBe('hotels.xml');
        expect(result.blob.size).toBe(expectedBlob.size);
        expect(result.blob.type).toBe(expectedBlob.type);
    });

    it('should return empty file model when name is empty', () => {
        let name: string = '';
        let data: CsvFileModel[] = [];

        let result = service.create(name, data);

        expect(result.name).toBeUndefined();
        expect(result.blob).toBeUndefined();
    });

    it('should return empty file model when data is empty', () => {
        let name: string = 'hotels';
        let data: CsvFileModel[] = [];

        let result = service.create(name, data);

        expect(result.name).toBeUndefined();
        expect(result.blob).toBeUndefined();
    });
});

