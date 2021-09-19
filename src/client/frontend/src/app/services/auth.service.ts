import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'grupo3-mean.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  registrar(usuario : any){
    console.log("Se va a tirar un registrar");
    
    return this.http.post<any>(this.URL + '/registrar', usuario)
  }
}
