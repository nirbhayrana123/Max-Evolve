
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/main/home/home.component';
import { ServicesComponent } from './layout/services/services.component';
import { PrivacyComponent } from './layout/privacy/privacy.component';
import {TermsComponent} from'./layout/terms/terms.component';
import{RestrictedComponent}from'./layout/restricted/restricted.component';
// import{CalculatorComponent} from './layout/calculator/calculator.component';




export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'restricted', component: RestrictedComponent },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./layout/calculator/calculator.component').then(
        (m) => m.CalculatorComponent
      ),
  },

];
