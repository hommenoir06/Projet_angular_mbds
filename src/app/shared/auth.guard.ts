import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return this.authService.isAdmin()
      .then(admin => {
        if (admin) {
          console.log("GUARD: Navigation autorisée");
          return true;
        } else {
          console.log("GUARD: Navigation NON autorisée");
          this.router.navigate(['/home']);
          return false;
        }
      });
  }
}
