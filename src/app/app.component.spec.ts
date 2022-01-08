import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CsvFileSpecification, HasValidStartRate, HasValidURL, IsNameUTF_8, } from './specifications/csv-file-specification';

import { AppComponent } from './app.component';
import { CsvFileModel } from './models/csv-file-model';
import { FileCreatorFactory } from './factory/file-creator-factory';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [CsvFileSpecification, IsNameUTF_8, HasValidURL, HasValidStartRate, FileCreatorFactory],
            declarations: [AppComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should call alert when there is no data', () => {
        component.dataList = [];

        spyOn(window, 'alert');

        component.produceFile('xml');

        expect(window.alert).toHaveBeenCalledWith('Please load csv file first');
    });

    it('should throw error when name is empty or null', () => {
        component.dataList.push({
            name: 'name',
            address: 'address',
            contact: 'contact',
            phone: 'phone',
            stars: 1,
            uri: 'uri',
        } as CsvFileModel);

        expect(() => component.produceFile('xml')).toThrow(new Error("Name cannot be null."))
    });
});
