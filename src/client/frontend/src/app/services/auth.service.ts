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
    this.router.navigate(['/tasks']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
