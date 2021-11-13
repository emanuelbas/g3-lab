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
