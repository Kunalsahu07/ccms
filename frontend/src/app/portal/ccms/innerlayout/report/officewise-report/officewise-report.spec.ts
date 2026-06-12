import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficewiseReport } from './officewise-report';

describe('OfficewiseReport', () => {
  let component: OfficewiseReport;
  let fixture: ComponentFixture<OfficewiseReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficewiseReport],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficewiseReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
