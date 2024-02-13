import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsformComponent } from './studentsform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [
    StudentsformComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    StudentsformComponent
  ]
})
export class StudentsformModule { }
