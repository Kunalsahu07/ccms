import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNo } from './case-no';

describe('CaseNo', () => {
  let component: CaseNo;
  let fixture: ComponentFixture<CaseNo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseNo],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseNo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
