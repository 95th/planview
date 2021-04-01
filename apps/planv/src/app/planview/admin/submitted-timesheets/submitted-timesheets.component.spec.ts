import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportsModule } from 'imports/imports.module';
import { SubmittedTimesheetsComponent } from './submitted-timesheets.component';

describe('SubmittedTimesheetsComponent', () => {
    let component: SubmittedTimesheetsComponent;
    let fixture: ComponentFixture<SubmittedTimesheetsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubmittedTimesheetsComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, ImportsModule, BrowserAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmittedTimesheetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
