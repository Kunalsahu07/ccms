import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpwiseReport } from './spwise-report';

describe('SpwiseReport', () => {
  let component: SpwiseReport;
  let fixture: ComponentFixture<SpwiseReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpwiseReport],
    }).compileComponents();

    fixture = TestBed.createComponent(SpwiseReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
