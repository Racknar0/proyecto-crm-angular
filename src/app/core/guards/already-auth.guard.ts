import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const alreadyAuthGuard: CanActivateFn = async (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  const isValid = await authService.validateToken(localStorage.getItem('token') || '', localStorage.getItem('email_user') || '');
  if (isValid) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};









