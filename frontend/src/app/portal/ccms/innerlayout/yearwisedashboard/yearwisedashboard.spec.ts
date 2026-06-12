import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Yearwisedashboard } from './yearwisedashboard';

describe('Yearwisedashboard', () => {
  let component: Yearwisedashboard;
  let fixture: ComponentFixture<Yearwisedashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Yearwisedashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Yearwisedashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
