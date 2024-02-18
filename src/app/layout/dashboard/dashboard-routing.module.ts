import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: StudentListComponent,
      },
      {
        path: 'students',
        component: StudentListComponent,
      },
      {
        path: 'student-form',
        component: StudentFormComponent,
      },
      {
        path: 'student-form/:id',
        component: StudentFormComponent,
      },
      {
        path: 'teachers',
        component: TeacherListComponent,
      },
      {
        path: 'teacher-form',
        component: TeacherFormComponent,
      },
      {
        path: 'teacher-form/:id',
        component: TeacherFormComponent,
      },
      {
        path: 'courses',
        component: CourseListComponent,
      },
      {
        path: 'course-form',
        component: CourseFormComponent,
      },
      {
        path: 'course-form/:id',
        component: CourseFormComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class DashboardRoutingModule {}
