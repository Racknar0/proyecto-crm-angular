import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';

const routes : Routes = [
  {
    path: '',
    component: CourseListComponent
  }
]

@NgModule({
  declarations: [
    CourseListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature(CoursesEffects), // Cargar el feature de los efectos
    StoreModule.forFeature(coursesFeature)  // Cargar el feature del reducer
  ]
})
export class CourseListModule { }


