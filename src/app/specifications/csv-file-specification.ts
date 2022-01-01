import { CsvFileModel } from "../models/csv-file-model";
import { Injectable } from "@angular/core";
import { Specification } from "./specification";

@Injectable()
export class CsvFileSpecification {
    constructor(
        private isNameUTF_8: IsNameUTF_8,
        private hasValidURL: HasValidURL,
        private hasValidStartRate: HasValidStartRate
    ) { }

    public isSatisfiedBy(entity: CsvFileModel): boolean {
        return this.isNameUTF_8
            .and(this.hasValidURL)
            .and(this.hasValidStartRate)
            .isSatisfiedBy(entity);
    }
}

@Injectable()
export class IsNameUTF_8 extends Specification<CsvFileModel>{
    private pattern: RegExp = /[A-Za-z\u00C0-\u00FF]+/g;
    expression(entity: CsvFileModel): boolean {
        return this.pattern.test(entity.name);
    }
}

@Injectable()
export class HasValidURL extends Specification<CsvFileModel>{
    private pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    expression(entity: CsvFileModel): boolean {
        return !!this.pattern.test(entity.uri);
    }
}

@Injectable()
export class HasValidStartRate extends Specification<CsvFileModel>{
    private minStartRate: number = 0;
    private maxStartRate: number = 5;
    expression(entity: CsvFileModel): boolean {
        return entity.stars >= this.minStartRate && entity.stars <= this.maxStartRate;
    }
}