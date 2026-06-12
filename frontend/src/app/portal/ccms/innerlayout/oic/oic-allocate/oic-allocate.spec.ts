import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OicAllocate } from './oic-allocate';

describe('OicAllocate', () => {
  let component: OicAllocate;
  let fixture: ComponentFixture<OicAllocate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OicAllocate],
    }).compileComponents();

    fixture = TestBed.createComponent(OicAllocate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
