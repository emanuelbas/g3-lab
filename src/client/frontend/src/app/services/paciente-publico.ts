import { Paciente } from './../components/estudios/alta-estudio/Empleado';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private URL = '/api'

  constructor(private http:HttpClient, private router: Router) { }


  createEmpleado(empleado: any){
    return this.http.post<any>(this.URL + '/alta-paciente-publico', Paciente)
  }



  getPaciente(){
    return this.http.get<any>(this.URL + '/obtener-paciente-publico')
  }
  getPacienteById(id: string){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'id' : id });


    return this.http.get<any>(this.URL + `/obtener-paciente-por-id/`, { headers: cpHeaders})
  }


}



