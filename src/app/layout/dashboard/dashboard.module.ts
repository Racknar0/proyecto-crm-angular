import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavbarModule } from './navbar/navbar.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentListModule } from './student-list/student-list.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentFormModule } from './student-form/student-form.module';
import { TeacherFormModule } from './teacher-form/teacher-form.module';
import { TeacherListModule } from './teacher-list/teacher-list.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { CourseFormModule } from './course-form/course-form.module';
import { CourseListModule } from './course-list/course-list.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NavbarModule,
    SharedModule,
    StudentListModule,
    StudentFormModule,
    TeacherListModule,
    TeacherFormModule,
    CourseListModule,
    CourseFormModule,

    RouterModule.forChild([
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
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
