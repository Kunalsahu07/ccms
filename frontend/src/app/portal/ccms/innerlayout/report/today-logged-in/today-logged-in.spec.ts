import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayLoggedIn } from './today-logged-in';

describe('TodayLoggedIn', () => {
  let component: TodayLoggedIn;
  let fixture: ComponentFixture<TodayLoggedIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodayLoggedIn],
    }).compileComponents();

    fixture = TestBed.createComponent(TodayLoggedIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
