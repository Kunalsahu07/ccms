import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicReport } from './mic-report';

describe('MicReport', () => {
  let component: MicReport;
  let fixture: ComponentFixture<MicReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicReport],
    }).compileComponents();

    fixture = TestBed.createComponent(MicReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
