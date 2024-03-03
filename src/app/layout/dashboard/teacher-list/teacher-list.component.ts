import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../interfaces/profesor.interface';
import { TeachersService } from '../../../core/services/teachers.service';
import { LoaderService } from '../../../core/services/loader.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss'
})
export class TeacherListComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'nombre', 'apellido', 'edad', 'especialidad', 'acciones' ];
  teachers: Profesor[] = [];
  userLogged : User | undefined;

  constructor(
    private teachersService: TeachersService,
    private loadingService: LoaderService,
    private authService: AuthService,
  ) {
    console.log('TeacherListComponent.constructor');
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
    this.getTeachers();
  }

  getTeachers(): void {
    this.loadingService.setIsLoading(true);
    this.teachersService.getTeachersFromService().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        console.log('Teachers:', teachers);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    })
  }

  deleteTeacher(teacher: Profesor): void {
    if (!confirm('¿Está seguro de eliminar el profesor?')) return;

    this.loadingService.setIsLoading(true);
    this.teachersService.deleteTeacher(teacher).subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        console.log('Teachers:', teachers);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      }
    });
  }

}
