import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ccmsfooter } from './ccmsfooter';

describe('Ccmsfooter', () => {
  let component: Ccmsfooter;
  let fixture: ComponentFixture<Ccmsfooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ccmsfooter],
    }).compileComponents();

    fixture = TestBed.createComponent(Ccmsfooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
