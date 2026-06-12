import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUploaded } from './document-uploaded';

describe('DocumentUploaded', () => {
  let component: DocumentUploaded;
  let fixture: ComponentFixture<DocumentUploaded>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentUploaded],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentUploaded);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
