import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherFormComponent } from './teacher-form.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    TeacherFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeacherFormModule { }
