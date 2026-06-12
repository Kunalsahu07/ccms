import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComplience } from './activity-complience';

describe('ActivityComplience', () => {
  let component: ActivityComplience;
  let fixture: ComponentFixture<ActivityComplience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityComplience],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityComplience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
