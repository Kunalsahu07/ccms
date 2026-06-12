import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictwiseReport } from './districtwise-report';

describe('DistrictwiseReport', () => {
  let component: DistrictwiseReport;
  let fixture: ComponentFixture<DistrictwiseReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistrictwiseReport],
    }).compileComponents();

    fixture = TestBed.createComponent(DistrictwiseReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
