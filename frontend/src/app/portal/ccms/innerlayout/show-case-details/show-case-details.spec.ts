import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseDetails } from './show-case-details';

describe('ShowCaseDetails', () => {
  let component: ShowCaseDetails;
  let fixture: ComponentFixture<ShowCaseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCaseDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowCaseDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
