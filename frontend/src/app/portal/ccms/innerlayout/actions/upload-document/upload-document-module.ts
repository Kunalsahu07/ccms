import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDocument } from './upload-document';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: UploadDocument
  }
];

@NgModule({
  declarations: [UploadDocument],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, HttpClientModule],
  exports: [UploadDocument]
})
export class UploadDocumentModule { }
