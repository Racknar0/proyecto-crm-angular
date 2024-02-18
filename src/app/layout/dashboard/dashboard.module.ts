import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavbarModule } from './navbar/navbar.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StudentListModule } from './student-list/student-list.module';
import { StudentFormModule } from './student-form/student-form.module';
import { TeacherFormModule } from './teacher-form/teacher-form.module';
import { TeacherListModule } from './teacher-list/teacher-list.module';
import { CourseFormModule } from './course-form/course-form.module';
import { CourseListModule } from './course-list/course-list.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

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
    DashboardRoutingModule,
    RouterModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
