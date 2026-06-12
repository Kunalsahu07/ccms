import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetails } from './user-details';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: UserDetails
  }
]

@NgModule({
  declarations: [UserDetails],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [UserDetails]
})
export class UserDetailsModule { }
