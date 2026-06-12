import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Innerlayout } from './innerlayout';

describe('Innerlayout', () => {
  let component: Innerlayout;
  let fixture: ComponentFixture<Innerlayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Innerlayout],
    }).compileComponents();

    fixture = TestBed.createComponent(Innerlayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
