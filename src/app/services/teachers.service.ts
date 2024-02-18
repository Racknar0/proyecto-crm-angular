import { Injectable } from '@angular/core';
import { Profesor } from '../interfaces/profesor.interface';
import { Observable, debounce, debounceTime, delay, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


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
  constructor(
    private http: HttpClient,
  ) {}

  getTeachersFromService() {
    //return of(TEACHERS_DATA).pipe(delay(500));
    const teachers = this.http.get<Profesor[]>('http://localhost:3000/teachers').pipe(delay(500));
    return teachers;
  }

  getTeacherById(id: number | string): Observable<Profesor | undefined> {
   // return of(TEACHERS_DATA.find((s) => s.id === +id)).pipe(delay(500));
    const teacher = this.http.get<Profesor>(`http://localhost:3000/teachers/${id}`).pipe(delay(500));
    return teacher;
  }

  addTeacher(teacher: Profesor): Observable<Profesor[]> {

    console.log('Profesor:', teacher);
    if (teacher.id) {
      const updateOperation = this.http.put(`http://localhost:3000/teachers/${teacher.id}`, teacher).pipe(
        delay(500),
        switchMap(() => this.getTeachersFromService()),
        tap((teachers) => console.log('Profesores restantes después de editar:', teachers))
      );
      return updateOperation;
    } else {
      const newTeacher = {
        nombre: teacher.nombre,
        apellido: teacher.apellido,
        edad: teacher.edad,
        especialidad: teacher.especialidad,
      };
      const addOperation = this.http.post<Profesor>('http://localhost:3000/teachers', newTeacher).pipe(
        delay(500),
        switchMap(() => this.getTeachersFromService()),
        tap((teachers) => console.log('Profesores restantes después de agregar:', teachers))
      );
      return addOperation;
    }

  }

  deleteTeacher(teacher: Profesor): Observable<Profesor[]> {
    // TEACHERS_DATA = TEACHERS_DATA.filter((s) => s.id !== teacher.id);
    // return of(TEACHERS_DATA).pipe(delay(500));
    const deleteOperation = this.http.delete(`http://localhost:3000/teachers/${teacher.id}`).pipe(
      delay(500),
      switchMap(() => this.getTeachersFromService()),
      tap((teachers) => console.log('Profesores restantes después de eliminar:', teachers))
    );
    return deleteOperation;
  }

}

