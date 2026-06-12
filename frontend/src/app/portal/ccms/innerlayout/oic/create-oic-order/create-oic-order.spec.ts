import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOicOrder } from './create-oic-order';

describe('CreateOicOrder', () => {
  let component: CreateOicOrder;
  let fixture: ComponentFixture<CreateOicOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOicOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOicOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
