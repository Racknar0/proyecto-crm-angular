import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsformComponent } from './studentsform.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    StudentsformComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    StudentsformComponent
  ]
})
export class StudentsformModule { }
