import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmButtonAlert } from '../../../../../utils/alerts';
import { Student } from '../../../../../interfaces/student.inteface';

@Component({
  selector: 'app-studentsform',
  templateUrl: './studentsform.component.html',
  styleUrls: ['./studentsform.component.scss'],
})
export class StudentsformComponent implements AfterViewChecked {
  studentForm: FormGroup;

  @Output() studenData = new EventEmitter();

  constructor(private fb: FormBuilder, private el: ElementRef) {
    this.studentForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$'),
        ],
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      curso: ['', Validators.required],
    });

    this.el = el;
  }

  ngAfterViewChecked() {}

  saveStudent() {
    const errorDiv = this.el.nativeElement.querySelector('.error');

    if (this.studentForm.valid) {
      confirmButtonAlert(
        'Confirmación',
        '¿Está seguro de guardar el estudiante?',
        'question',
        'Si',
        'No'
      ).then((result) => {
        if (result.isConfirmed) {
          this.studenData.emit(this.studentForm.value as Student);
          this.studentForm.reset();
          errorDiv.innerHTML = '';
        }
      });
    } else {
      this.showValidationAlerts(this.studentForm);
    }
  }

  private showValidationAlerts(formGroup: FormGroup): void {
    const errorDiv = this.el.nativeElement.querySelector('.error');
    errorDiv.innerHTML = '';

    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.get(controlName);

      if (control instanceof FormGroup) {
        this.showValidationAlerts(control);
      } else if (control?.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          if (control.errors) {
            this.addAlert(
              `Error en ${controlName}: ${this.getErrorMessage(
                errorKey,
                control.errors[errorKey]
              )}`
            );
          }
        });
      }
    });
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    switch (errorKey) {
      case 'required':
        return 'Este campo es requerido.';
      case 'minlength':
        return `Longitud mínima es ${errorValue.requiredLength}.`;
      case 'maxlength':
        return `La longitud máxima es ${errorValue.requiredLength}.`;
      case 'min':
        return `El valor mínimo es ${errorValue.min}.`;
      case 'max':
        return `El valor máximo es ${errorValue.max}.`;
      case 'pattern':
        return 'El valor ingresado no es válido.';
      case 'email':
        return 'El correo ingresado no es válido.';
      default:
        return `Error desconocido: ${errorKey}.`;
    }
  }

  private addAlert(message: string): void {
    console.log(message);
    const errorDiv = this.el.nativeElement.querySelector('.error');

    if (errorDiv) {
      const errorParagraph = document.createElement('p');
      errorParagraph.style.cssText = `
          background-color: #ff4040;
          color: #fff;
          margin-bottom: 5px;
          text-align: center;
          padding: 5px;
          border-radius: 5px;
      `;
      errorParagraph.textContent = message;
      errorDiv.appendChild(errorParagraph);
  }
  }
}
