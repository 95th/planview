import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportsModule } from 'imports/imports.module';
import { CreateWorkAssignmentComponent } from './create-work-assignment.component';

describe('CreateWorkAssignmentComponent', () => {
    let component: CreateWorkAssignmentComponent;
    let fixture: ComponentFixture<CreateWorkAssignmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateWorkAssignmentComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, ImportsModule, BrowserAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateWorkAssignmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
