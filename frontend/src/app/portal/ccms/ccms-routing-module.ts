import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './home/about/about';
import { Login } from './login/login';
import { Shell } from './innerlayout/shell/shell';
import { Outerdashboard } from './home/outerdashboard/outerdashboard';
import { OnboardingForm } from './home/onboarding-form/onboarding-form';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Videotutorial } from './home/videotutorial/videotutorial';

const routes: Routes = [
  {
    path: '', component: Home, pathMatch: 'full'
  },
  { path: 'home', component: Home, title: 'Home' },
  { path: 'about', component: About, title: 'About' },
  { path: 'video', component: Videotutorial, title: 'video tutorial' },
  { path: 'onboarding', component: OnboardingForm, title: 'onboarding Form' },
  { path: 'outerdashboard', component: Outerdashboard, title: 'outerdashboard' },
  { path: 'login', component: Login, title: 'Login' },
  {
    path: 'adminHome', component: Shell,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard', loadChildren: () => import('./innerlayout/dashboard/dashboard-module').then(m => m.DashboardModule)
      },
      {
        path: 'dashboard_click', loadChildren: () => import('./innerlayout/dashboard/dashboard-click/dashboard-click-module').then(m => m.DashboardClickModule)
      },
      {
        path: 'yearwisedash', loadChildren: () => import('./innerlayout/yearwisedashboard/yearwisedashboard-module').then(m => m.YearwisedashboardModule)
      },
      {
        path: 'show_case_details', loadChildren: () => import('./innerlayout/show-case-details/show-case-details-module').then(m => m.ShowCaseDetailsModule)
      },
      {
        path: 'yearwisedash_click', loadChildren: () => import('./innerlayout/yearwisedashboard/yearwisedashboard-click/yearwisedashboard-click-module').then(m => m.YearwisedashboardClickModule)
      },
      {
        path: 'actions/add_new_case', loadChildren: () => import('./innerlayout/actions/add-new-case/add-new-case-module').then(m => m.AddNewCaseModule)
      },
      {
        path: 'actions/upload_document', loadChildren: () => import('./innerlayout/actions/upload-document/upload-document-module').then(m => m.UploadDocumentModule)
      },
      {
        path: 'inbox', loadChildren: () => import('./innerlayout/inbox/inbox-module').then(m => m.InboxModule)
      },
      {
        path: 'oic/create', loadChildren: () => import('./innerlayout/oic/create-oic-order/create-oic-order-module').then(m => m.CreateOicOrderModule)
      },
      {
        path: 'oic/request', loadChildren: () => import('./innerlayout/oic/incoming-oic-request/incoming-oic-request-module').then(m => m.IncomingOicRequestModule)
      },
      { path: 'oicAllocate', loadChildren: () => import('./innerlayout/oic/oic-allocate/oic-allocate-module').then(m => m.OicAllocateModule) },
      {
        path: 'query/builder', loadChildren: () => import('./innerlayout/query/query-builder/query-builder-module').then(m => m.QueryBuilderModule)
      },
      {
        path: 'query/officewiseDashboard', loadChildren: () => import('./innerlayout/query/officewise-dashboard/officewise-dashboard-module').then(m => m.OfficewiseDashboardModule)

      },
      {
        path: 'search/caseno', loadChildren: () => import('./innerlayout/search/case-no/case-no-module').then(m => m.CaseNoModule)
      },
      {
        path: 'search/agno', loadChildren: () => import('./innerlayout/search/ag-no/ag-no-module').then(m => m.AgNoModule)
      },
      {
        path: 'casetransfer', loadChildren: () => import('./innerlayout/case-transfer/case-transfer-module').then(m => m.CaseTransferModule)
      }, {
        path: 'report/documentUploaded', loadChildren: () => import('./innerlayout/report/document-uploaded/document-uploaded-module').then(m => m.DocumentUploadedModule)
      }, {
        path: 'report/userDetails', loadChildren: () => import('./innerlayout/report/user-details/user-details-module').then(m => m.UserDetailsModule)
      },
      {
        path: 'report/officewiseReport', loadChildren: () => import('./innerlayout/report/officewise-report/officewise-report-module').then(m => m.OfficewiseReportModule)
      },
      {
        path: 'report/districtwiseReport', loadChildren: () => import('./innerlayout/report/districtwise-report/districtwise-report-module').then(m => m.DistrictwiseReportModule)
      },
      {
        path: 'report/activityComplience', loadChildren: () => import('./innerlayout/report/activity-complience/activity-complience-module').then(m => m.ActivityComplienceModule)
      },
      {
        path: 'report/appDownloadedUser', loadChildren: () => import('./innerlayout/report/app-downloaded-user-details/app-downloaded-user-details-module').then(m => m.AppDownloadedUserDetailsModule)
      },
      {
        path: 'report/caselogReport', loadChildren: () => import('./innerlayout/report/caselog-report/caselog-report-module').then(m => m.CaselogReportModule)
      },
      {
        path: 'report/deptwiseReport', loadChildren: () => import('./innerlayout/report/deptwise-document-click/deptwise-document-click-module').then(m => m.DeptwiseDocumentClickModule)
      },
      {
        path: 'report/mis', loadChildren: () => import('./innerlayout/report/mic-report/mic-report-module').then(m => m.MicReportModule)
      },
      {
        path: 'report/spwiseReport', loadChildren: () => import('./innerlayout/report/spwise-report/spwise-report-module').then(m => m.SpwiseReportModule)
      },
      {
        path: 'report/todayLogin', loadChildren: () => import('./innerlayout/report/today-logged-in/today-logged-in-module').then(m => m.TodayLoggedInModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, HttpClientModule],
  exports: [RouterModule],
})
export class CcmsRoutingModule { }
