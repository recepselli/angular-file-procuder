import { CsvFileSpecification, HasValidStartRate, HasValidURL, IsNameUTF_8 } from './csv-file-specification';

import { CsvFileModel } from '../models/csv-file-model';
import { TestBed } from '@angular/core/testing';

describe('CsvFileSpecification', () => {
    let service: CsvFileSpecification;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CsvFileSpecification, IsNameUTF_8, HasValidURL, HasValidStartRate]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(CsvFileSpecification);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return true when model name is UTF-8, valid stars and uri', () => {
        const model: CsvFileModel = {
            name: 'The Gibson',
            address: 'address',
            stars: 1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.recepselli.com'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(true);
    });

    it('should return false when name is Non UTF-8 characters but valid stars and uri', () => {
        const model: CsvFileModel = {
            name: '大阪',
            address: 'address',
            stars: 1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.recepselli.com'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(false);
    });

    it('should return false when model name is UTF-8 and has valid uri, but has invalid stars', () => {
        const model: CsvFileModel = {
            name: 'The Gibson',
            address: 'address',
            stars: 99,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.recepselli.com'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(false);
    });

    it('should return false when model name is UTF-8 and has valid stars, but has invalid uri', () => {
        const model: CsvFileModel = {
            name: 'The Gibson',
            address: 'address',
            stars: 99,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.bbbbb'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(false);
    });
});

describe('IsNameUTF_8', () => {
    let service: IsNameUTF_8;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IsNameUTF_8]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(IsNameUTF_8);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return true when name is UTF-8', () => {
        const model: CsvFileModel = {
            name: 'The Gibson',
            address: 'address',
            stars: 1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.recepselli.com'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(true);
    });

    it('should return false when name is Non UTF-8 characters', () => {
        const model: CsvFileModel = {
            name: '大阪',
            address: 'address',
            stars: 1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.recepselli.com'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(false);
    });

    it('should return false when name is empty', () => {
        const model: CsvFileModel = {
            name: '',
            address: 'address',
            stars: 1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.recepselli.com'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(false);
    });
});

describe('HasValidURL', () => {
    let service: HasValidURL;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HasValidURL]
        });
    })

    beforeEach(() => {
        service = TestBed.inject(HasValidURL);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('should return true when uri has valid URL', () => {
        const model: CsvFileModel = {
            name: '',
            address: 'address',
            stars: 1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.recepselli.com'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(true);
    });

    it('should return false when uri has invalid URL', () => {
        const model: CsvFileModel = {
            name: '',
            address: 'address',
            stars: 1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'aaa'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(false);
    });
});

describe('HasValidStartRate', () => {
    let service: HasValidStartRate;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HasValidStartRate]
        })
    })

    beforeEach(() => {
        service = TestBed.inject(HasValidStartRate);
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('should return true when stars has valid value', () => {
        const model: CsvFileModel = {
            name: '',
            address: 'address',
            stars: 1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'http://www.recepselli.com'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(true);
    });

    it('should return false when stars has value less than zero', () => {
        const model: CsvFileModel = {
            name: '',
            address: 'address',
            stars: -1,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'aaa'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(false);
    });

    it('should return false when stars has value bigger than five', () => {
        const model: CsvFileModel = {
            name: '',
            address: 'address',
            stars: 6,
            contact: 'Recep Selli',
            phone: '+420608465590',
            uri: 'aaa'
        };

        var result = service.isSatisfiedBy(model);

        expect(result).toBe(false);
    });
});