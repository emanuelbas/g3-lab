import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = '/api'

  constructor(private http:HttpClient, private router: Router) { }

  registrar(usuario : any){
    return this.http.post<any>(this.URL + '/registrar', usuario)
  }


  ingresar(usuario : any){
    return this.http.post<any>(this.URL + '/ingresar', usuario)
  }

  loggedIn(): Boolean {
    return localStorage.getItem('token') ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rol');
    localStorage.removeItem('userid');
    this.router.navigate(['/tasks']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedAsAdmin(): Boolean {
    if (localStorage.getItem('rol')) {
      return localStorage.getItem('rol') == 'Admin' ? true : false;
    }
    return false
  }

  loggedAsConfigurador(): Boolean {
    if (localStorage.getItem('rol')) {
      return localStorage.getItem('rol') == 'Configurador' ? true : false;
    }
    return false
  }

  loggedAsEmpleado(): Boolean {
    if (localStorage.getItem('rol')) {
      return localStorage.getItem('rol') == 'Empleado' ? true : false;
    }
    return false
  }

  loggedAsPacientePublico(): Boolean {
    if (localStorage.getItem('rol')) {
      return localStorage.getItem('rol') == '' ? true : false;
    }
    return false
  }

  loggedAsPaciente(): Boolean {
    if (localStorage.getItem('rol')) {
      return localStorage.getItem('rol') == 'Paciente' ? true : false;
    }
    return false
  }

}
