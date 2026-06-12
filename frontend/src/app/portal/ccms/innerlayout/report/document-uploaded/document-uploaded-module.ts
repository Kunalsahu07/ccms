import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploaded } from './document-uploaded';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DocumentUploaded
  }
]


@NgModule({
  declarations: [DocumentUploaded],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DocumentUploaded]
})
export class DocumentUploadedModule { }
