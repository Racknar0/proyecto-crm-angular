import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TeacherListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class TeacherListModule { }
