import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmButtonAlert, simpleButtonAlert } from '../../../utils/alerts';
import { StudentsService } from '../../../services/students.service';
import { LoaderService } from '../../../services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../../../services/teachers.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss',
})
export class TeacherFormComponent implements OnInit {
  teacherForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeachersService,
    private loadingService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.teacherForm = this.fb.group({
      id: this.fb.control(''),
      nombre: this.fb.control('', Validators.required),
      apellido: this.fb.control('', Validators.required),
      edad: this.fb.control('', Validators.required),
      especialidad: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log('ID:', id);

    if (id) {
      console.log('Editando profesor');
      this.isEditing = true;
      this.loadingService.setIsLoading(true);
      this.teacherService.getTeacherById(id).subscribe({
        next: (teacher) => {
          console.log('teacher:', teacher);
          this.teacherForm.patchValue({
            ...teacher,
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
  }

  saveStudent() {
    let errorsText = '';

    // Marcar todos los campos como tocados para mostrar los mensajes de error
    Object.values(this.teacherForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.teacherForm.invalid) {
      errorsText = 'Formulario inválido. Por favor, corrige los errores.\n';
      // Mostrar el alert con los errores acumulados
      simpleButtonAlert('Error', errorsText, 'error', 'Aceptar');
    } else {
      confirmButtonAlert(
        'Confirmación',
        `¿Está seguro de ${this.isEditing ? 'actualizar' : 'guardar'} el profesor?`,
        'question',
        `${this.isEditing ? 'Actualizar' : 'Guardar'}`,
        'Cancelar'
      ).then((result) => {
        if (result.isConfirmed) {
          this.loadingService.setIsLoading(true);
          this.teacherService.addTeacher(this.teacherForm.value).subscribe({
            next: (teachers) => {
              console.log('teachers:', teachers);
              simpleButtonAlert(
                'Éxito',
                `Profesor ${this.isEditing ? 'actualizado' : 'guardado'} correctamente`,
                'success',
                'Aceptar'
              );
            },
            error: (error) => {
              console.error('Error:', error);
              simpleButtonAlert(
                'Error',
                'Error al guardar el Profesor',
                'error',
                'Aceptar'
              );
            },
            complete: () => {
              this.loadingService.setIsLoading(false);
              // Redirigir a la lista de estudiantes
              this.router.navigate(['/dashboard/teachers']);
            },
          });
        }
      });
    }
  }

}
