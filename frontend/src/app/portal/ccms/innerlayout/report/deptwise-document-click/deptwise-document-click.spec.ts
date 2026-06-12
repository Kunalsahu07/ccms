import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptwiseDocumentClick } from './deptwise-document-click';

describe('DeptwiseDocumentClick', () => {
  let component: DeptwiseDocumentClick;
  let fixture: ComponentFixture<DeptwiseDocumentClick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeptwiseDocumentClick],
    }).compileComponents();

    fixture = TestBed.createComponent(DeptwiseDocumentClick);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
