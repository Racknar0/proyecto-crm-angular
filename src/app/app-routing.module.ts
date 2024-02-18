import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AuthComponent } from './layout/auth/auth.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { alreadyAuthGuard } from './core/guards/already-auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    canActivate: [alreadyAuthGuard],
    // component: AuthComponent
    loadChildren: () => import('./layout/auth/auth.module').then(m => m.AuthModule)
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
