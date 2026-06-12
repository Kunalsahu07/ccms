import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ccmsheader } from './ccmsheader';

describe('Ccmsheader', () => {
  let component: Ccmsheader;
  let fixture: ComponentFixture<Ccmsheader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ccmsheader],
    }).compileComponents();

    fixture = TestBed.createComponent(Ccmsheader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
