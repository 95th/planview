import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkAssignmentComponent } from './create-work-assignment.component';

describe('CreateWorkAssignmentComponent', () => {
  let component: CreateWorkAssignmentComponent;
  let fixture: ComponentFixture<CreateWorkAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkAssignmentComponent ]
    })
    .compileComponents();
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
