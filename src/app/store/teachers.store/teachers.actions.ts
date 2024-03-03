import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Profesor } from "../../interfaces/profesor.interface";


//! Acciones agrupadas para el módulo de profesores
export const TeacherActions = createActionGroup({
  source: 'Teacher', // Prefijo para las acciones
  events: {
    'setTeachers': props<{ teachers: Profesor[] }>(), // Acción para establecer los profesores
    'getTeachers': emptyProps(), // Acción para obtener los profesores
  },
});
