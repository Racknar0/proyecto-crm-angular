import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    StudentListComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    StudentListComponent,
  ],
})
export class StudentListModule { }
