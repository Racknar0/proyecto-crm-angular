import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseFormComponent } from './course-form.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CourseFormModule { }
