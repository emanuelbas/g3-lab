import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {


  private URL = '/api'

  constructor(private http:HttpClient, private router: Router) { }


  getEstudioById(id: string){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', '_id' : id });
    return this.http.get<any>(this.URL + '/obtener-estudio', { headers: cpHeaders})
  }

  getEmpleados(){
    return this.http.get<any>(this.URL + '/obtener-empleados')
  }

  getPacientes(){
    return this.http.get<any>(this.URL + '/obtener-pacientes')
  }
  getMedicos(){
    return this.http.get<any>(this.URL + '/obtener-medico-derivante')
  }

  getTiposDeEstudio(){
    return this.http.get<any>(this.URL + '/obtener-tipos-de-estudio')
  }
  getDiagnosticos(){
    return this.http.get<any>(this.URL + '/obtener-diagnosticos-presuntivos')
  }

  createEstudio(estudio: any){
    return this.http.post<any>(this.URL + '/alta-estudio', estudio)
  }

  descargarPresupuesto(idEstudio:any){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'text', '_id' : idEstudio });
    console.log(cpHeaders)
    return this.http.get<any>(this.URL + '/descargar-presupuesto/' + idEstudio, { headers: cpHeaders })
  }

  setEstado(estudioId:any, nombreEstado:string){
    let data = {
      "estudio": estudioId,
      "estado": nombreEstado
    }
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'estudio' : estudioId , 'estado': nombreEstado});
    console.log(data)
    return this.http.get<any>(this.URL + '/cambiar-estado', { headers: cpHeaders})
  }

  getEstudios(){
    return this.http.get<any>(this.URL + '/obtener-estudios')
  }

  getEstudiosPorEstado(){
    return this.http.get<any>(this.URL + '/obtener-estudios-por-estado')
  }

  getAll(filter: string){
    return this.http.get(`${this.URL}/estudio-getAll${filter}`)
  }
  subirComprobante(formData: any){
    return this.http.post('/api/upload', formData)
  }
  // getMedicoDerivante(){
  //   return this.http.get<any>(this.URL + '/obtener-medico-derivante')
  // }

  // createMedicoDerivante(medicoDerivante: any){
  //   console.log("medicoDerivante", medicoDerivante)
  //   return this.http.post<any>(this.URL + '/alta-medico-derivante', medicoDerivante)
  // }

  // deleteMedicoDerivante(id: any){
  //   let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   let options = ({ headers: cpHeaders });
  //   return this.http.patch(this.URL+'/baja-medico-derivante', id, options)
  //  /*  return this.http.patch<any>(this.URL + '/baja-medico-derivante', {'id': id}) */
  // }

  // updateMedicoDerivante(med: any){
  //   return this.http.patch(this.URL + '/editar-medico-derivante', med)
  // }



}
