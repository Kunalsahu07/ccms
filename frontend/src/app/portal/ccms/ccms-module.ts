import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcmsRoutingModule } from './ccms-routing-module';
import { Home } from './home/home';
import { Login } from './login/login';
import { Ccmsfooter } from './layout/ccmsfooter/ccmsfooter';
import { Ccmsheader } from './layout/ccmsheader/ccmsheader';
import { Innerlayout } from './innerlayout/innerlayout';
import { About } from './home/about/about';
import { Homedash } from './home/homedash/homedash';
import { OnboardingForm } from './home/onboarding-form/onboarding-form';
import { Outerdashboard } from './home/outerdashboard/outerdashboard';
import { Videotutorial } from './home/videotutorial/videotutorial';
import { FormsModule } from '@angular/forms';
import { InnerlayoutModule } from './innerlayout/innerlayout-module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    Home,
    Login,
    Ccmsfooter,
    Ccmsheader,
    Innerlayout,
    About,
    Homedash,
    OnboardingForm,
    Outerdashboard,
    Videotutorial,
  ],
  imports: [CommonModule, CcmsRoutingModule, FormsModule, InnerlayoutModule, HttpClientModule],
})
export class CcmsModule { }
