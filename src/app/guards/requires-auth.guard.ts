import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const requiresAuthGuard: CanActivateFn = (route, state) => {
  
  const userService = inject(UserService);
  const router = inject(Router);

  // Check if the authenticated token exists
  if (userService.auth_token) {
    // User is authenticated, allow access to the route
    return true;
  } else {
    // User is not authenticated, redirect to the login page
    router.navigateByUrl('/login');
    return false;
  }
};
