import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private URL = '/api'

  constructor(private http:HttpClient, private router: Router) { }


  createEmpleado(empleado: any){
    console.log("empleado", empleado)
    return this.http.post<any>(this.URL + '/alta-empleado', empleado)
  }

  deleteEmpleado(id: any){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = ({ headers: cpHeaders });
    return this.http.patch(this.URL+'/baja-empleado', id, options)

  }

  updateEmpleado(emp: any){
    return this.http.patch(this.URL + '/editar-empleado', emp)
  }

  getEmpleado(){
    return this.http.get<any>(this.URL + '/obtener-empleado')
  }
  getEmpleadoById(id: string){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'id' : id });


    return this.http.get<any>(this.URL + `/obtener-empleado-por-id/`, { headers: cpHeaders})
  }


}

