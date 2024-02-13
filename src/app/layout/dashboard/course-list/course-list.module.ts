import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CourseListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CourseListModule { }


