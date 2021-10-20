import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoGuard implements CanActivate {

  
  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  canActivate() : boolean {
    if (!this.authService.loggedIn()){
      this.router.navigate(['/403']);
      return false;
    }
    if (!(localStorage.getItem('rol') == 'Empleado')){
      this.router.navigate(['/403']);
      return false;
    }
    
    return true;
  }
  
  
}
