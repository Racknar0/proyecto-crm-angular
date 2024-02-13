import { Injectable } from '@angular/core';
import { Profesor } from '../interfaces/profesor.interface';
import { Observable, debounce, debounceTime, delay, of } from 'rxjs';


let TEACHERS_DATA: Profesor[] = [
  {
    id: 1,
    nombre: 'Camilo Eduardo',
    apellido: 'Torres Perez',
    edad: 30,
    especialidad: 'Matemáticas',
  },
  {
    id: 2,
    nombre: 'Juan Carlos',
    apellido: 'Alvarez Alvarez',
    edad: 35,
    especialidad: 'Física',
  },
];

@Injectable({ providedIn: 'root' })
export class TeachersService {
  constructor() {}

  getTeacherById(id: number | string): Observable<Profesor | undefined> {
    return of(TEACHERS_DATA.find((s) => s.id === +id)).pipe(delay(500));
  }

  getTeachersFromService() {
    return of(TEACHERS_DATA).pipe(delay(500));
  }

  addTeacher(teacher: Profesor): Observable<Profesor[]> {
    // Si el id existe en el arreglo, se actualiza el estudiante
    console.log('Profesor:', teacher);
    const teacherExists = TEACHERS_DATA.find((s) => s.id === teacher.id);
    if (teacherExists) {
      console.log('Profesor existe:', teacherExists);
      TEACHERS_DATA = TEACHERS_DATA.map((s) =>
        s.id === teacher.id
          ? {
              ...teacher,
            }
          : s
      );
    } else {
      console.log('Profesor no existe:', teacherExists);
      TEACHERS_DATA = [...TEACHERS_DATA, teacher];
    }
    return of(TEACHERS_DATA).pipe(delay(500));
  }

  deleteTeacher(teacher: Profesor): Observable<Profesor[]> {
    TEACHERS_DATA = TEACHERS_DATA.filter((s) => s.id !== teacher.id);
    return of(TEACHERS_DATA).pipe(delay(500));
  }

}

