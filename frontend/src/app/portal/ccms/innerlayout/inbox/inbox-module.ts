import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Inbox } from './inbox';

const routes: Routes = [
  {
    path: '',
    component: Inbox
  }
];

@NgModule({
  declarations: [Inbox],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [Inbox]
})
export class InboxModule { }
