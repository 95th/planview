import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportsModule } from 'imports/imports.module';
import { SharedModule } from 'planview/shared/shared.module';
import { TimesheetComponent } from './timesheet.component';

describe('TimesheetComponent', () => {
    let component: TimesheetComponent;
    let fixture: ComponentFixture<TimesheetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimesheetComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ImportsModule,
                BrowserAnimationsModule,
                SharedModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimesheetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
