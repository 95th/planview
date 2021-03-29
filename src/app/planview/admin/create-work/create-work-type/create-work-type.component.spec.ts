import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkTypeComponent } from './create-work-type.component';

describe('CreateWorkTypeComponent', () => {
    let component: CreateWorkTypeComponent;
    let fixture: ComponentFixture<CreateWorkTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateWorkTypeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateWorkTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
