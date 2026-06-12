import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppDownloadedUserDetails } from './app-downloaded-user-details';

const routes: Routes = [
  {
    path: '', component: AppDownloadedUserDetails
  }
]
@NgModule({
  declarations: [AppDownloadedUserDetails],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AppDownloadedUserDetails]
})
export class AppDownloadedUserDetailsModule { }
