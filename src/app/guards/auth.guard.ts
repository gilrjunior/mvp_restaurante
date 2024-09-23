import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injetando o AuthService
  const router = inject(Router);

  if(authService.authenticated()){
    return true
  }else{
    router.navigate(['/login']);
    return false
  }
};
