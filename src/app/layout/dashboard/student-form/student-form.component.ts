import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmButtonAlert, simpleButtonAlert } from '../../../utils/alerts';
import { StudentsService } from '../../../services/students.service';
import { LoaderService } from '../../../services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../../../services/teachers.service';
import { Profesor } from '../../../interfaces/profesor.interface';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../interfaces/courses.interface';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent implements OnInit  {
  studentForm: FormGroup;
  isEditing: boolean = false;
  teacherList: Profesor[] = [];
  courseList: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private loadingService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private teacherService: TeachersService,
    private courseService: CoursesService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      id: this.fb.control(''),
      nombre: this.fb.control('', Validators.required),
      apellido: this.fb.control('', Validators.required),
      correo: this.fb.control('', Validators.required),
      telefono: this.fb.control('', Validators.required),
      curso: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params['id'];


    if (id){
      console.log('ID:', id);
      console.log('Editando estudiante');
      this.isEditing = true;
      this.loadingService.setIsLoading(true);
      this.studentService.getStudenById(id).subscribe({
        next: (student) => {
          console.log('Student:', student);
          this.studentForm.patchValue({
            ...student,
          });
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      });
    }

    this.loadingService.setIsLoading(true);
    this.teacherService.getTeachersFromService().subscribe({
      next: (teachers) => {
        console.log('Teachers:', teachers);
        this.teacherList = teachers;
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });

    this.loadingService.setIsLoading(true);
    this.courseService.getCourseFromService().subscribe({
      next: (courses) => {
        console.log('Courses:', courses);
        this.courseList = courses;
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });

  }

  saveStudent() {
    let errorsText = '';

    // Marcar todos los campos como tocados para mostrar los mensajes de error
    Object.values(this.studentForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.studentForm.invalid) {
      errorsText = 'Formulario inválido. Por favor, corrige los errores.\n';
      // Mostrar el alert con los errores acumulados
      simpleButtonAlert('Error', errorsText, 'error', 'Aceptar');
    } else {
      confirmButtonAlert(
        'Confirmación',
        `¿Está seguro de ${this.isEditing ? 'actualizar' : 'guardar'} el estudiante?`,
        'question',
        `${this.isEditing ? 'Actualizar' : 'Guardar'}`,
        'Cancelar'
      ).then((result) => {
        if (result.isConfirmed) {
          this.loadingService.setIsLoading(true);
          this.studentService.addStudent(this.studentForm.value).subscribe({
            next: (students) => {
              console.log('Students:', students);
              simpleButtonAlert(
                'Éxito',
                `Estudiante ${this.isEditing ? 'actualizado' : 'guardado'} correctamente`,
                'success',
                'Aceptar'
              );
            },
            error: (error) => {
              console.error('Error:', error);
              simpleButtonAlert(
                'Error',
                'Error al guardar el estudiante',
                'error',
                'Aceptar'
              );
            },
            complete: () => {
              this.loadingService.setIsLoading(false);
              // Redirigir a la lista de estudiantes
              this.router.navigate(['/dashboard']);
            },
          });
        }
      });
    }
  }
}
