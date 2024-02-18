import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);


  // Validar que el token del usuario esté almacenado en el local storage y sea el mismo que el token almacenado en la base de datos

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email_user');

  if (!token || !email) {
    router.navigate(['/login']);
    return false;
  }

  const isValid = await authService.validateToken(token, email);
  if (!isValid) {
    router.navigate(['/login']);
    return false;
  }



  return true;
};
