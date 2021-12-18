import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {



//   router.get('/get-turnos-libres/:date', turnoControllers.getTurnosLibres);
// router.post('/tomar-turno', turnoControllers.tomarTurno);
  constructor(private http:HttpClient, private router: Router) { }

  private URL = '/api'
  obtenerTurnosParaFecha(fecha:any){
    return this.http.get<any>(this.URL + '/get-turnos-libres/' + fecha)
  }

  guardarTurno(fecha:any, paciente: any, estudio: any){
    //var { fecha, paciente, estudio } = req.body;
    // hardcodeo para probar

//     "paciente" : "619014e2e1950ff9a5607adb",
// "fecha" : "2021-12-12T15:45:00.000Z",
// "estudio" : "6192a8f4ecadcc5954872bb3"
    fecha = "2021-12-12T15:45:00.000Z"
    paciente = '619014e2e1950ff9a5607adb'
    estudio = "6192a8f4ecadcc5954872bb3"
    let cpHeaders = new HttpHeaders({ 'Content-Type': 'text', 'fecha' : fecha, 'paciente': paciente, 'estudio': estudio});
    return this.http.post<any>(this.URL + '/tomar-turno/', cpHeaders)
  }

}
