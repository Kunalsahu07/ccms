import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClick } from './dashboard-click';

describe('DashboardClick', () => {
  let component: DashboardClick;
  let fixture: ComponentFixture<DashboardClick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardClick],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardClick);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
