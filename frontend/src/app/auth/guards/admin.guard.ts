import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is authenticated and has the 'admin' role
    const isAdmin = this.userService.userValue.isAdmin;
    if (isAdmin) {
      return true; // User is authorized, allow access
    } else {
      console.log('not admin')
      this.router.navigate(['/']); // Redirect to '/pages' if not admin
      return false; // User is not authorized, block access
    }
  }
}
