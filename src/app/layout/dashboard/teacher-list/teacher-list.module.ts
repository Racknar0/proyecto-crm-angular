import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherListComponent } from './teacher-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: TeacherListComponent,
  },
];

@NgModule({
  declarations: [TeacherListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [TeacherListComponent, RouterModule],
})
export class TeacherListModule {
  constructor() {
    console.log('TeacherListModule loaded');
  }
}
