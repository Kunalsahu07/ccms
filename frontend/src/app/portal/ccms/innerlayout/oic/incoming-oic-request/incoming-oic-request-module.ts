import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomingOicRequest } from './incoming-oic-request';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IncomingOicRequest
  }
];


@NgModule({
  declarations: [IncomingOicRequest],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [IncomingOicRequest]
})
export class IncomingOicRequestModule { }
