import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearwisedashboardClick } from './yearwisedashboard-click';

describe('YearwisedashboardClick', () => {
  let component: YearwisedashboardClick;
  let fixture: ComponentFixture<YearwisedashboardClick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearwisedashboardClick],
    }).compileComponents();

    fixture = TestBed.createComponent(YearwisedashboardClick);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
