import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AuthComponent } from './layout/auth/auth.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule)
    // component: DashboardComponent
  },
  {
    path: 'login',
    // loadChildren: () => import('./layout/auth/auth.module').then(m => m.AuthModule)
    component: AuthComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
