import { Component, OnInit } from '@angular/core';
import { Student } from '../../../interfaces/student.inteface';
import { StudentsService } from '../../../core/services/students.service';
import { LoaderService } from '../../../core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { CoursesService } from '../../../core/services/courses.service';
import { forkJoin, map } from 'rxjs';
import { Course } from '../../../interfaces/courses.interface';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {

  userLogged : User | undefined;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'fullName',
    'correo',
    'telefono',
    'curso',
    'acciones',
  ];
  students: Student[] = [];
  coursesList: Course[] = [];

  constructor(
    private studentsService: StudentsService,
    private loadingService: LoaderService,
    private courseService: CoursesService,
    private authService: AuthService,
    public dialog: MatDialog
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
    this.getData();
  }

  getData() {
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.studentsService.getStudentsFromService(),
      this.courseService.getCourseFromService(),
    ]).subscribe({
      next: ([students, courses]) => {
        //console.log('forkJoin Students:', students);
        // console.log('forkJoin Courses:', courses);
        this.students = students;
        this.coursesList = courses;
        this.loadingService.setIsLoading(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loadingService.setIsLoading(false);
      },
    });
  }

  deleteStudent(student: Student): void {
    if (!confirm('¿Está seguro de eliminar el estudiante?')) return;

    this.loadingService.setIsLoading(true);
    this.studentsService.deleteStudent(student).subscribe({
      next: (students) => {
        this.students = [...students];
        this.loadingService.setIsLoading(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loadingService.setIsLoading(false);
      },
    });
  }

  showCourseDialog(course: string): void {
    console.log('course on showCourseDialog:***** ', course);

    console.log('coursesList:', this.coursesList);
    const dataCourse = this.coursesList.find((c) => c.nombre === course);

    console.log('dataCourse:', dataCourse);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height: '400px',
      data: dataCourse, // Pasa el curso encontrado como dato al diálogo
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
