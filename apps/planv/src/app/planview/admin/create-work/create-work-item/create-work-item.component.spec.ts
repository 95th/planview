import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ImportsModule } from 'imports/imports.module';
import { CreateWorkItemComponent } from './create-work-item.component';

describe('CreateWorkItemComponent', () => {
    let component: CreateWorkItemComponent;
    let fixture: ComponentFixture<CreateWorkItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateWorkItemComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, ImportsModule, BrowserAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateWorkItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
