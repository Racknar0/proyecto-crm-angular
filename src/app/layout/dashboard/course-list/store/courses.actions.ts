import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../../../interfaces/courses.interface';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Delete Course': props<{ data: Course }>(),
    'Delete Course Success': emptyProps(),
    'Delete Course Failure': props<{ error: unknown }>(),
  }
});
