import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        // component: StudentListComponent,
        loadChildren: () => import('./student-list/student-list.module').then((m) => m.StudentListModule),
      },
      {
        path: 'students',
        // component: StudentListComponent,
        loadChildren: () => import('./student-list/student-list.module').then((m) => m.StudentListModule),
      },
      {
        path: 'student-form',
        //component: StudentFormComponent,
        loadChildren: () => import('./student-form/student-form.module').then((m) => m.StudentFormModule),
      },
      {
        path: 'student-form/:id',
        // component: StudentFormComponent,
        loadChildren: () => import('./student-form/student-form.module').then((m) => m.StudentFormModule),
      },
      {
        path: 'teachers',
        // component: TeacherListComponent,
        loadChildren: () => import('./teacher-list/teacher-list.module').then((m) => m.TeacherListModule),
      },
      {
        path: 'teacher-form',
        //component: TeacherFormComponent,
        loadChildren: () => import('./teacher-form/teacher-form.module').then((m) => m.TeacherFormModule),
      },
      {
        path: 'teacher-form/:id',
        // component: TeacherFormComponent,
        loadChildren: () => import('./teacher-form/teacher-form.module').then((m) => m.TeacherFormModule),
      },
      {
        path: 'courses',
        // component: CourseListComponent,
        loadChildren: () => import('./course-list/course-list.module').then((m) => m.CourseListModule),
      },
      {
        path: 'course-form',
        // component: CourseFormComponent,
        loadChildren: () => import('./course-form/course-form.module').then((m) => m.CourseFormModule),
      },
      {
        path: 'course-form/:id',
        // component: CourseFormComponent,
        loadChildren: () => import('./course-form/course-form.module').then((m) => m.CourseFormModule),
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
