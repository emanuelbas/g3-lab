import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private URL = '/api'

  constructor(private http: HttpClient, private router: Router) { }

  createPaciente(paciente: any) {
    console.log("paciente", paciente)
    return this.http.post<any>(this.URL + '/alta-paciente', paciente)
  }

  autoregistro(formPaciente: any) {
    let data = {
      "fechanac": formPaciente.fecha,
      "dni": formPaciente.dni,
      "password": formPaciente.password1,
      "name": formPaciente.name,
      "surname": formPaciente.surname,
      "phone": formPaciente.telefono,
      "direccion": formPaciente.direccion,
      "email": formPaciente.email,
      "nombretutor": formPaciente.tutorName,
      "apellidotutor": formPaciente.tutorSurname,
      "direcciontutor": formPaciente.tutorDireccion,
      "emailtutor": formPaciente.tutorEmail
    }
    return this.http.post<any>(this.URL + '/autoregistro-paciente', data)
  }

  deletePaciente(id: any) {
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = ({ headers: cpHeaders });
    return this.http.patch(this.URL + '/baja-paciente', id, options)
    /*  return this.http.patch<any>(this.URL + '/baja-medico-derivante', {'id': id}) */
  }

  updatePaciente(med: any) {
    return this.http.patch(this.URL + '/editar-paciente', med)
  }

  getPaciente() {
    console.log("entro al get 2");
    return this.http.get<any>(this.URL + '/obtener-pacientes')
  }
  getPacienteById(id: string) {
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'id': id });


    return this.http.get<any>(this.URL + `/obtener-paciente-por-id/`, { headers: cpHeaders })
  }
}
