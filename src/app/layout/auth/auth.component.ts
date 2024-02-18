import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm: FormGroup;
  revealPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, //Validators.email
    ]),
      password: this.fb.control('' , [Validators.required, //Validators.minLength(6)
    ]),
    });
  }

  login() {
    // Comprobar si this.loginForm es null
    if (this.loginForm) {
      // Marcar como tocados todos los campos del formulario
      this.loginForm.markAllAsTouched();

      if (this.loginForm.valid) {
        // Validar el usuario
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        this.authService.login(email, password);
      }
    } else {
      console.error('El formulario de inicio de sesión es null.');
    }
  }
}
