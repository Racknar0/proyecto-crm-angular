import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureKey, ProfesorState } from "./teachers.reducers";


// Selector para obtener el estado de los profesores
export const selectTeachersState = createFeatureSelector<ProfesorState>(FeatureKey);
export const selectTeachers = createSelector(
  selectTeachersState,
  (state) => state.teachers
)
