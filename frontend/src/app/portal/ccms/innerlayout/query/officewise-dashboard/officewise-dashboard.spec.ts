import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficewiseDashboard } from './officewise-dashboard';

describe('OfficewiseDashboard', () => {
  let component: OfficewiseDashboard;
  let fixture: ComponentFixture<OfficewiseDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficewiseDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(OfficewiseDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
