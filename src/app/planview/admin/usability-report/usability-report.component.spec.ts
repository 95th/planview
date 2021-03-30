import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsabilityReportComponent } from './usability-report.component';

describe('UsabilityReportComponent', () => {
  let component: UsabilityReportComponent;
  let fixture: ComponentFixture<UsabilityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsabilityReportComponent ]
    })
    .compileComponents();
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
