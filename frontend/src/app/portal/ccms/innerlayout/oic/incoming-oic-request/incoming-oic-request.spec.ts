import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingOicRequest } from './incoming-oic-request';

describe('IncomingOicRequest', () => {
  let component: IncomingOicRequest;
  let fixture: ComponentFixture<IncomingOicRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomingOicRequest],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomingOicRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
