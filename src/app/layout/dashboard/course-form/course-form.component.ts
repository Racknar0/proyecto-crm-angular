import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmButtonAlert, simpleButtonAlert } from '../../../utils/alerts';
import { CoursesService } from '../../../services/courses.service';
import { LoaderService } from '../../../services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../../../services/teachers.service';
import { Profesor } from '../../../interfaces/profesor.interface';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit  {
  courseForm: FormGroup;
  isEditing: boolean = false;
  teacherList: Profesor[] = [];

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private loadingService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private teacherService: TeachersService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      id: this.fb.control(''),
      nombre: this.fb.control('', Validators.required),
      descripcion: this.fb.control('', Validators.required),
      duracion: this.fb.control('', Validators.required),
      profesor: this.fb.control('', Validators.required),
      fechaInicio: this.fb.control('', Validators.required),
      fechaFin: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params['id'];
    if (id) {
      console.log('ID:', id);
      console.log('Editando curso');
      this.isEditing = true;
      this.loadingService.setIsLoading(true);
      this.coursesService.getCourseById(id).subscribe({
        next: (course) => {
          console.log('course:', course);
          this.courseForm.patchValue({
            ...course,
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
        this.teacherList = teachers;
        console.log('teachers:', teachers);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });

  }

  saveCourse() {
    let errorsText = '';

    // Marcar todos los campos como tocados para mostrar los mensajes de error
    Object.values(this.courseForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.courseForm.invalid) {
      errorsText = 'Por favor, completa el formulario';
      simpleButtonAlert('Error', errorsText, 'error', 'Aceptar');
      return;
    } else {
      confirmButtonAlert(
        'Confirmación',
        `¿Está seguro de ${this.isEditing ? 'actualizar' : 'guardar'} el curso?`,
        'question',
        `${this.isEditing ? 'Actualizar' : 'Guardar'}`,
        'Cancelar'
      ).then((result) => {
        if (result.isConfirmed) {
          this.loadingService.setIsLoading(true);

          const nameTeacher = this.courseForm.value.profesor;
          const teacher = this.teacherList.find((teacher) => teacher.nombre === nameTeacher);
          this.courseForm.value.profesor = teacher;

          this.coursesService.addCourse(this.courseForm.value).subscribe({
            next: (courses) => {
              console.log('courses:', courses);
              simpleButtonAlert(
                'Éxito',
                `El curso ha sido ${this.isEditing ? 'actualizado' : 'guardado'} correctamente`,
                'success',
                'Aceptar'
              ).then(() => {
                this.router.navigate(['/dashboard/courses']);
              });
            },
            error: (error) => {
              console.error('Error:', error);
              simpleButtonAlert('Error', 'Ha ocurrido un error', 'error' , 'Aceptar');
            },
            complete: () => {
              this.loadingService.setIsLoading(false);
            },
          });
        }
      });
    }
  }
}
