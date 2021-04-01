import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportsModule } from 'imports/imports.module';
import { SharedModule } from 'planview/shared/shared.module';
import { UsabilityReportComponent } from './usability-report.component';

describe('UsabilityReportComponent', () => {
    let component: UsabilityReportComponent;
    let fixture: ComponentFixture<UsabilityReportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UsabilityReportComponent],
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
        fixture = TestBed.createComponent(UsabilityReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
