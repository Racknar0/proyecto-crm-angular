import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavbarModule } from './navbar/navbar.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NavbarModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
