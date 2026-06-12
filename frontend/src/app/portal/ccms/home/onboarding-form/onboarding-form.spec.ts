import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingForm } from './onboarding-form';

describe('OnboardingForm', () => {
  let component: OnboardingForm;
  let fixture: ComponentFixture<OnboardingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardingForm],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
