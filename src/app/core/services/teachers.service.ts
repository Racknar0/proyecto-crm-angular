import { Injectable } from '@angular/core';
import { Profesor } from '../../interfaces/profesor.interface';
import {
  Observable,
  debounce,
  debounceTime,
  delay,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from './courses.service';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  constructor(
    private http: HttpClient,
    private coursesService: CoursesService,
    private loaderService: LoaderService
  ) {}

  getTeachersFromService() {
    //return of(TEACHERS_DATA).pipe(delay(500));
    const teachers = this.http
      .get<Profesor[]>('http://localhost:3000/teachers')
      .pipe(delay(500));
    return teachers;
  }

  getTeacherById(id: number | string): Observable<Profesor | undefined> {
    // return of(TEACHERS_DATA.find((s) => s.id === +id)).pipe(delay(500));
    const teacher = this.http
      .get<Profesor>(`http://localhost:3000/teachers/${id}`)
      .pipe(delay(500));
    return teacher;
  }

  addTeacher(teacher: Profesor): Observable<Profesor[]> {
    console.log('Profesor:', teacher);
    if (teacher.id) {
      const updateOperation = this.http
        .put(`http://localhost:3000/teachers/${teacher.id}`, teacher)
        .pipe(
          delay(500),
          switchMap(() => this.getTeachersFromService()),
          tap((teachers) =>
            console.log('Profesores restantes después de editar:', teachers)
          )
        );
      return updateOperation;
    } else {
      const newTeacher = {
        nombre: teacher.nombre,
        apellido: teacher.apellido,
        edad: teacher.edad,
        especialidad: teacher.especialidad,
      };
      const addOperation = this.http
        .post<Profesor>('http://localhost:3000/teachers', newTeacher)
        .pipe(
          delay(500),
          switchMap(() => this.getTeachersFromService()),
          tap((teachers) =>
            console.log('Profesores restantes después de agregar:', teachers)
          )
        );
      return addOperation;
    }
  }

  deleteTeacher(teacher: Profesor): Observable<Profesor[]> {
    let teacherHasCourses: boolean;
    this.loaderService.setIsLoading(true);

    // Validar si el profesor tiene cursos asociados
    return this.coursesService.getCoursesByTeacherId(teacher.id).pipe(
      tap(courses => {
        if (courses.length > 0) {
          teacherHasCourses = true;
          console.log('El profesor tiene cursos asociados:', courses);
        } else {
          teacherHasCourses = false;
          console.log('El profesor no tiene cursos asociados');
        }
      }),
      switchMap(courses => {
        if (teacherHasCourses) {
          alert('El profesor tiene cursos asociados, no se puede eliminar hasta que no elimines los cursos asociados');
          return this.getTeachersFromService();
        } else {
          return this.http.delete(`http://localhost:3000/teachers/${teacher.id}`).pipe(
            delay(500),
            switchMap(() => this.getTeachersFromService())
          );
        }
      }),
      tap(teachers => {
        console.log('Profesores restantes después de eliminar:', teachers);
        this.loaderService.setIsLoading(false);
      })
    );
  }
}
