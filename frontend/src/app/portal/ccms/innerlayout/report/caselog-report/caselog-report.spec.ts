import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaselogReport } from './caselog-report';

describe('CaselogReport', () => {
  let component: CaselogReport;
  let fixture: ComponentFixture<CaselogReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaselogReport],
    }).compileComponents();

    fixture = TestBed.createComponent(CaselogReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
