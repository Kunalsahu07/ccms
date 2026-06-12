import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgNo } from './ag-no';

describe('AgNo', () => {
  let component: AgNo;
  let fixture: ComponentFixture<AgNo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgNo],
    }).compileComponents();

    fixture = TestBed.createComponent(AgNo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
