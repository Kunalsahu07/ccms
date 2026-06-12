import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Videotutorial } from './videotutorial';

describe('Videotutorial', () => {
  let component: Videotutorial;
  let fixture: ComponentFixture<Videotutorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Videotutorial],
    }).compileComponents();

    fixture = TestBed.createComponent(Videotutorial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
