import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { local } from 'd3';

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
    return this.http.get<any>(this.URL + '/descargar-presupuesto/' + idEstudio, { headers: cpHeaders })
  }

  descargarConsentimiento(idEstudio:any){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'text', '_id' : idEstudio });
    return this.http.get<any>(this.URL + '/descargar-consentimiento/' + idEstudio, { headers: cpHeaders })
  }

  descargarComprobante(idEstudio:any){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'text', '_id' : idEstudio });
    return this.http.get<any>(this.URL + '/descargar-comprobante/' + idEstudio, { headers: cpHeaders })
  }

  setEstado(estudioId:any, nombreEstado:string){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'estudio' : estudioId , 'estado': nombreEstado, 'userid' : localStorage.userid});
    return this.http.get<any>(this.URL + '/cambiar-estado', { headers: cpHeaders})
  }

  encolarALote(idestudio:any){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'idestudio' : idestudio });
    return this.http.get<any>(this.URL + '/encolar-estudio-a-lote', { headers: cpHeaders})
  }
  nextEstadoLote(idestudio:any){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'idestudio' : idestudio });
    return this.http.get<any>(this.URL + '/lote-siguiente-estado', { headers: cpHeaders})
  }

  getEstudios(){
    return this.http.get<any>(this.URL + '/obtener-estudios')
  }

  getEstudiosPorEstado(){
    return this.http.get<any>(this.URL + '/obtener-estudios-por-estado')
  }

  getGanancias(){
    return this.http.get<any>(this.URL + '/obtener-ganancias-mensuales')
  }
  getAll(filter: string){
    return this.http.get(`${this.URL}/estudio-getAll${filter}`)
  }
  subirComprobante(formData: any, id: string){
    formData.id = id
    let cpHeaders = new HttpHeaders({ 'id':id });
    return this.http.post('/api/upload', formData, {headers:cpHeaders})
  }
  subirCIF(formData: any, id: string){
    formData.id = id
    let cpHeaders = new HttpHeaders({ 'id':id });
    return this.http.post('/api/upload-cif', formData, {headers:cpHeaders})
  }
  subirResultadoLote(formData: any, id: string){
    formData.id = id
    let cpHeaders = new HttpHeaders({ 'id':id });
    return this.http.post('/api/upload-resultado-lote', formData, {headers:cpHeaders})
  }
  subirInterpretacionMuestra(formData: any, id: string){
    formData.id = id
    let cpHeaders = new HttpHeaders({ 'id':id });
    return this.http.post('/api/upload-interpretacion-muestra', formData, {headers:cpHeaders})
  }
  getDuracionAnual(){
    return this.http.get<any>(this.URL + '/obtener-duracion-anual')
  }

  registrarTomaDeMuestra(idEstudio: any, cantMililitosExtraidos: any, numeroFrizer: any ){    
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'idEstudio' : idEstudio , 'cantMililitosExtraidos': cantMililitosExtraidos, 'numeroFrizer' : numeroFrizer});
    return this.http.get<any>(this.URL + '/registrar-toma-de-muestra',  { headers: cpHeaders })
  }

  getOs(id : string){
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'id':id });
    return this.http.get<any>(this.URL + '/obtener-os', {headers:cpHeaders})
  }
}
