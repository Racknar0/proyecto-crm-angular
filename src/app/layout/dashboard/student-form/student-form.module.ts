import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './student-form.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StudentFormModule { }
