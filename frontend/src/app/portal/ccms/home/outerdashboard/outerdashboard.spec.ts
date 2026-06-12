import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Outerdashboard } from './outerdashboard';

describe('Outerdashboard', () => {
  let component: Outerdashboard;
  let fixture: ComponentFixture<Outerdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Outerdashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Outerdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
