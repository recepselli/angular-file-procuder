import { CsvFileModel } from "../../models/csv-file-model";
import { JsonFileCreator } from "./json-file-creator";
import { TestBed } from "@angular/core/testing";

describe('JsonFileCreator', () => {
    let service: JsonFileCreator;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [JsonFileCreator]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(JsonFileCreator);
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

        let expectedBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });

        let result = service.create(name, data);

        expect(result.name).toBe('hotels.json');
        expect(result.blob.size).toBe(expectedBlob.size);
        expect(result.blob.type).toBe(expectedBlob.type);

    });

    it('should return null file model when name is empty', () => {
        let name: string = '';
        let data: CsvFileModel[] = [];

        data.push({
            name: 'Selli Hotel',
            address: 'Prague',
            contact: 'Recep Selli',
            phone: '+420000000',
            stars: 5,
            uri: 'www.sellihotel.com'
        } as CsvFileModel);

        let result = service.create(name, data);

        expect(result.name).toBeUndefined();
        expect(result.blob).toBeUndefined();

    });

    it('should return null file model when data is empty', () => {
        let name: string = 'hotels';
        let data: CsvFileModel[] = [];

        let result = service.create(name, data);

        expect(result.name).toBeUndefined();
        expect(result.blob).toBeUndefined();
    });
});
