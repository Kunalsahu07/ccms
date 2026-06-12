import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTransfer } from './case-transfer';

describe('CaseTransfer', () => {
  let component: CaseTransfer;
  let fixture: ComponentFixture<CaseTransfer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseTransfer],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseTransfer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
