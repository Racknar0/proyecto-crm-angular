import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../../../../interfaces/courses.interface';

export const coursesFeatureKey = 'courses';

export interface State {
  courses: Course[];
}

export const initialState: State = {
  courses: [],
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, state => state),
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    console.log('Action:', action);
    return {
      ...state,
      courses: action.data
    };
  }),
  on(CoursesActions.loadCoursesFailure, (state, action) => state),
  on(CoursesActions.deleteCourse, state => state),
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

