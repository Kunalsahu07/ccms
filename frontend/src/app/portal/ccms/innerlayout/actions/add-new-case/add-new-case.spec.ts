import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCase } from './add-new-case';

describe('AddNewCase', () => {
  let component: AddNewCase;
  let fixture: ComponentFixture<AddNewCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewCase],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewCase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
