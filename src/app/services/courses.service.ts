import { Injectable } from '@angular/core';
import { Course } from '../interfaces/courses.interface';
import { Observable, debounce, debounceTime, delay, of } from 'rxjs';

/*

export interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  diracion: number;
  profesor: Profesor;
  fechaInicio: Date;
  fechaFin: Date;
}

*/

let COURSES_DATA: Course[] = [
  {
    id: 1,
    nombre: 'Introducción a Algebra Lineal',
    descripcion: 'Curso de introducción a algebra lineal',
    duracion: 40,
    profesor: {
      id: 1,
      nombre: 'Juan Carlos',
      apellido: 'Alvarez Alvarez',
      edad: 40,
      especialidad: 'Matemáticas',
    },
    fechaInicio: new Date('2021-08-01'),
    fechaFin: new Date('2021-08-30'),
  },
  {
    id: 2,
    nombre: 'Introducción a Angular',
    descripcion: 'Curso de introducción a Angular',
    duracion: 40,
    profesor: {
      id: 2,
      nombre: 'Camilo Eduardo',
      apellido: 'Torres Perez',
      edad: 40,
      especialidad: 'Desarrollo de Software',
    },
    fechaInicio: new Date('2021-08-01'),
    fechaFin: new Date('2021-08-30'),
  },
];

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}

  getCourseById(id: number | string): Observable<Course | undefined> {
    return of(COURSES_DATA.find((s) => s.id === +id)).pipe(delay(500));
  }

  getCourseFromService() {
    return of(COURSES_DATA).pipe(delay(500));
  }

  addCourse(course: Course): Observable<Course[]> {
    // Si el id existe en el arreglo, se actualiza el curso
    console.log('Course:', course);
    const courseExists = COURSES_DATA.find((s) => s.id === course.id);
    if (courseExists) {
      console.log('Estudiante existe:', courseExists);
      COURSES_DATA = COURSES_DATA.map((s) =>
        s.id === course.id
          ? { ...course, }
          : s
      );
    } else {
      console.log('Estudiante no existe:', courseExists);
      //! Si el id no existe en el arreglo, se agrega el estudiante
      COURSES_DATA.push({
        ...course,
        id: COURSES_DATA.length + 1,
      });
    }

    return this.getCourseFromService().pipe(delay(500));
  }

  deleteCourse(course: Course): Observable<Course[]> {
    COURSES_DATA = COURSES_DATA.filter((s) => s.id !== course.id);
    return this.getCourseFromService().pipe(delay(500));
  }
}
