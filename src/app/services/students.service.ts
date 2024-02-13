import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student.inteface';
import { Observable, debounce, debounceTime, delay, of } from 'rxjs';

let STUDENTS_DATA: Student[] = [
  {
    id: 1,
    nombre: 'Camilo Eduardo',
    apellido: 'Torres Perez',
    fullName: { nombre: 'Camilo Eduardo', apellido: 'Torres Perez' },
    correo: 'correo@corre.com',
    telefono: '3233642951',
    curso: 'Introducción a Algebra Lineal',
  },
  {
    id: 2,
    nombre: 'Juan Carlos',
    apellido: 'Alvarez Alvarez',
    fullName: { nombre: 'Juan Carlos', apellido: 'Alvarez Alvarez' },
    correo: 'correo@corre.com',
    telefono: '3233642951',
    curso: 'Introducción a Angular',
  },
];

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor() {}

  getStudenById(id: number | string): Observable<Student | undefined> {
    return of(STUDENTS_DATA.find((s) => s.id === +id)).pipe(delay(500));
  }

  getStudentsFromService() {
    return of(STUDENTS_DATA).pipe(delay(500));
  }

  addStudent(student: Student): Observable<Student[]> {
    // Si el id existe en el arreglo, se actualiza el estudiante
    console.log('Estudiante:', student);
    const studentExists = STUDENTS_DATA.find((s) => s.id === student.id);
    if (studentExists) {
      console.log('Estudiante existe:', studentExists);
      STUDENTS_DATA = STUDENTS_DATA.map((s) =>
        s.id === student.id
          ? {
              ...student,
              fullName: {
                nombre: student.nombre,
                apellido: student.apellido,
              },
            }
          : s
      );
    } else {
      console.log('Estudiante no existe:', studentExists);
      //! Si el id no existe en el arreglo, se agrega el estudiante
      STUDENTS_DATA.push({
        ...student,
        id: STUDENTS_DATA.length + 1,
        fullName: {
          nombre: student.nombre,
          apellido: student.apellido,
        },
      });
    }

    return this.getStudentsFromService().pipe(delay(500));
  }

  deleteStudent(student: Student): Observable<Student[]> {
    STUDENTS_DATA = STUDENTS_DATA.filter((s) => s.id !== student.id);
    return this.getStudentsFromService().pipe(delay(500));
  }
}
