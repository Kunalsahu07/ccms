import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDownloadedUserDetails } from './app-downloaded-user-details';

describe('AppDownloadedUserDetails', () => {
  let component: AppDownloadedUserDetails;
  let fixture: ComponentFixture<AppDownloadedUserDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppDownloadedUserDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDownloadedUserDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
