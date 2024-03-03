import { Component, OnInit } from '@angular/core';
import { Course } from '../../../interfaces/courses.interface';
import { CoursesService } from '../../../core/services/courses.service';
import { LoaderService } from '../../../core/services/loader.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'duracion',
    'profesor',
    'fechaInicio',
    'fechaFin',
    'acciones',
  ];
  courses: Course[] = [];
  userLogged: User | undefined;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoaderService,
    private authService: AuthService
  ) {
    this.authService.setUserLoggedByToken().subscribe({
      next: (user) => {
        this.userLogged = user[0];
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.loadingService.setIsLoading(true);
    this.coursesService.getCourseFromService().subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log('Courses:', courses);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

  deleteCourse(course: Course): void {
    if (!confirm('¿Está seguro de eliminar el curso?')) return;

    this.loadingService.setIsLoading(true);
    this.coursesService.deleteCourse(course).subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log('Courses:', courses);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }
}
