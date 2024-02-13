import { Component, OnInit } from '@angular/core';
import { Student } from '../../../interfaces/student.inteface';
import { StudentsService } from '../../../services/students.service';
import { LoaderService } from '../../../services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { CoursesService } from '../../../services/courses.service';
import { map } from 'rxjs';
import { Course } from '../../../interfaces/courses.interface';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'nombre', 'apellido', 'fullName', 'correo', 'telefono', 'curso', 'acciones' ];
  students: Student[] = [];
  coursesList: Course[] = [];

  constructor(
    private studentsService: StudentsService,
    private loadingService: LoaderService,
    private courseService: CoursesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getStudents();
    this.getCourses();
  }

  getStudents(): void {
    this.loadingService.setIsLoading(true);
    this.studentsService.getStudentsFromService().subscribe({
      next: (students) => {
        this.students = students;
        console.log('Students:', students);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    })
  }

  getCourses(): void {
    this.loadingService.setIsLoading(true);
    this.courseService.getCourseFromService().subscribe({
      next: (courses) => {
        console.log('Coursesxxxxx:', courses);
        this.coursesList = courses;
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    });
  }

  deleteStudent(student: Student): void {
    if (!confirm('¿Está seguro de eliminar el estudiante?')) return;

    this.loadingService.setIsLoading(true);
    this.studentsService.deleteStudent(student).subscribe({
      next: (students) => {
        this.students = students;
        console.log('Students:', students);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    });
  }

  showCourseDialog(course: string): void {
    console.log('course on showCourseDialog:', course);

    console.log('coursesList:', this.coursesList);
    const dataCourse = this.coursesList.find(c => c.nombre === course);

    console.log('dataCourse:', dataCourse);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height: '400px',
      data: dataCourse // Pasa el curso encontrado como dato al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
