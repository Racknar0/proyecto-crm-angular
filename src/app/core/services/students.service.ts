import { Injectable } from '@angular/core';
import { Student } from '../../interfaces/student.inteface';
import {
  Observable,
  debounce,
  debounceTime,
  delay,
  of,
  tap,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudentsFromService() {
    // return of(STUDENTS_DATA).pipe(delay(500));
    const students = this.http
      .get<Student[]>('http://localhost:3000/students')
      .pipe(delay(500));
    return students;
  }

  getStudenById(id: number | string): Observable<Student | undefined> {
    // return of(STUDENTS_DATA.find((s) => s.id === +id)).pipe(delay(500));
    const student = this.http
      .get<Student>(`http://localhost:3000/students/${id}`)
      .pipe(delay(300));
    console.log('Estudiante por id:', student);
    return student;
  }

  addStudent(student: Student): Observable<Student[]> {
    // Verificar si el estudiante ya existe
    const nombreCompleto = {
      nombre: student.nombre,
      apellido: student.apellido,
    };
    student.fullName = nombreCompleto;

    if (student.id) {
      // Estas editando
      console.log('Estudiante a editar:', student);
      const updateOperation = this.http
        .put(`http://localhost:3000/students/${student.id}`, student)
        .pipe(
          delay(500),
          // Después de editar el estudiante, obtener los estudiantes restantes
          switchMap(() => this.getStudentsFromService()),
          tap((students) =>
            console.log('Estudiantes restantes después de editar:', students)
          )
        );
      return updateOperation;
    } else {
      // Estas agregando
      console.log('Estudiante a agregar:', student);
      // Remover el id para que el servidor genere uno nuevo
      const newStudent = {
        nombre: student.nombre,
        apellido: student.apellido,
        fullName: nombreCompleto,
        correo: student.correo,
        telefono: student.telefono,
        curso: student.curso,
      };

      const addOperation = this.http
        .post('http://localhost:3000/students', newStudent)
        .pipe(
          delay(500),
          // Después de agregar el estudiante, obtener los estudiantes restantes
          switchMap(() => this.getStudentsFromService()),
          tap((students) =>
            console.log('Estudiantes restantes después de agregar:', students)
          )
        );
      return addOperation;
    }
  }

  deleteStudent(student: Student): Observable<Student[]> {
    // Borrar estudiante
    const deleteOperation = this.http
      .delete(`http://localhost:3000/students/${student.id}`)
      .pipe(
        delay(500),
        // Después de borrar el estudiante, obtener los estudiantes restantes
        switchMap(() => this.getStudentsFromService()),
        tap((students) =>
          console.log('Estudiantes restantes después de borrar:', students)
        )
      );
    return deleteOperation;
  }

  getStudentsByCourseName(courseName: string): Observable<Student[]> {
    // return of(STUDENTS_DATA.filter((s) => s.curso === courseName)).pipe(delay(500));
    const students = this.http
      .get<Student[]>(`http://localhost:3000/students?curso=${courseName}`)
      .pipe(delay(500));
    return students;
  }
}
