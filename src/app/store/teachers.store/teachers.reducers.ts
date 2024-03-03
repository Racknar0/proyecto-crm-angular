import { createReducer, on } from '@ngrx/store';
import { Profesor } from '../../interfaces/profesor.interface';
import { TeacherActions } from './teachers.actions';

export const FeatureKey = 'teachers';

export interface ProfesorState {
  teachers: Profesor[];
}

export const initialState: ProfesorState = {
  teachers: [],
};

export const teachersReducer = createReducer<ProfesorState>(
  initialState,
  on(TeacherActions.getTeachers, (state) => {
    console.log('TeacherActions.getTeachers', state);
    return { ...state };
  }),
  on(TeacherActions.setTeachers, (state, payload) => {
    return { ...state, teachers: payload.teachers };
  })
);
