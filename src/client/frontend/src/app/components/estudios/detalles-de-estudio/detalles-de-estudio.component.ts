import { Component, OnInit } from '@angular/core';
import { EstudioService } from '../../../services/estudio.service';
import { TurnoService } from '../../../services/turno.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Estudio } from '../../../models/estudio'
//import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { thresholdSturges } from 'd3';

@Component({
  selector: 'app-detalles-de-estudio',
  templateUrl: './detalles-de-estudio.component.html',
  styleUrls: ['./detalles-de-estudio.component.css']
})
export class DetallesDeEstudioComponent implements OnInit {

  //formTurnos: FormGroup;
  estudio: any = {
    _id: '',
    nombre_paciente: '',
    nombre_medico_derivante: '',
    nombre_tipo_estudio: '',
    diagnostico_presuntivo: '',
    detalle_diagnostico: '',
    estado_actual: '',
    historial: '',

  }
  estudioConEstado: Estudio = new Estudio();
  // lista =[]
  listas: any[] = [];
  minDate: String = new Date().toISOString().split('T')[0]
  fechaSeleccionada = ''
  turnoSeleccionado: any | undefined
  fechasDisponibles = []
  estudioId = ''
  mililitrosExtraidos = 0
  numeroFrizer = 0

  //historial:any[] = [];
  //lista:string[]=["hola","que","tal","estas"];
  constructor(
    public estudioService: EstudioService,
    public turnoService: TurnoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.formTurnos = new FormGroup({
    //   turnoSeleccionado: new FormControl('', [])
    // })
  }


  getEstudioById = (id: string) => {
    this.estudioService.getEstudioById(id)
      .subscribe((resp) => {
        this.estudio = resp;
        this.listas = resp?.historialDeEstudio;//?para no romper la aplicacion
        this.listas = this.listas.sort((a, b) => { let fecha1 = new Date(a.fechaInicio).getTime(); let fecha2 = new Date(b.fechaInicio).getTime(); if (fecha1 < fecha2) { return -1 } else { return 1 } })
        console.log(this.listas)
        this.estudioConEstado = new Estudio(this.estudio.estado.nombre)
      })
  }


  //fileupload
  uploadedFiles: Array<File> = [];
  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  upload(idEstudio: any) {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.estudioService.subirComprobante(formData, idEstudio).subscribe((response) => {
      this.estudioConEstado.siguiente(idEstudio, this.estudioService)
    })
  }

  uploadCIF(idEstudio: any) {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.estudioService.subirCIF(formData, idEstudio).subscribe((response) => {
      this.estudioConEstado.siguiente(idEstudio, this.estudioService)
    })
  }

  submitFecha() {
    alert("ok el submit")
  }
  guardaFecha(fecha: any) {

    let dia = new Date(fecha.value).getDay()
    if (dia == 6 || dia == 5) {
      this.fechaSeleccionada = ''
      this.fechasDisponibles = []
    } else {
      this.fechaSeleccionada = fecha
      this.turnoService.obtenerTurnosParaFecha(fecha.value).subscribe((listaDeTurnos) => {
        this.fechasDisponibles = listaDeTurnos
      })
    }
  }
  seleccionarTurno(turno: any) {
    this.turnoSeleccionado = turno.value

  }
  registrarTurno() {
    let fecha = "2021-12-12T15:45:00.000Z"
    let paciente = '619014e2e1950ff9a5607adb'
    let estudio = "6192a8f4ecadcc5954872bb3"
    this.turnoService.guardarTurno(this.turnoSeleccionado, this.estudio.paciente._id, this.estudioId).subscribe(() => {
      this.estudioConEstado.siguiente(this.estudioId, this.estudioService)
    })
  }

  // Toma de muestra
  guardaMililitros(ml: any) {
    ml = ml.value
    if (ml >= 5 && ml <= 12.5) {
      this.mililitrosExtraidos = ml
    } else {
      alert("Solo será valido una cantidad de mililitros entre 5 y 12,5")
    }
    
  }
  guardaNumeroFrizer(numero: any) {
    numero= numero.value
    if (numero > 0) {
      this.numeroFrizer = numero
    } else {
      alert("El numero debe ser mayor a 0")
    }
    
  }
  guardaTomaDeMuestra(){
    if (this.mililitrosExtraidos && this.numeroFrizer){
      this.estudioService.registrarTomaDeMuestra(this.estudioId,this.mililitrosExtraidos,this.numeroFrizer).subscribe(()=>{
        this.estudioConEstado.siguiente(this.estudioId,this.estudioService)
      })
    } else {
      alert("Verificar los datos ingresados")
    }

  }
  //
  //file upload

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        let id: string = params.get('id') ? params.get('id')! : ''
        this.estudioId = id
        this.getEstudioById(id)
      }
    });
  }
  backNavigate = () => {
    this.router.navigate(['/listar-estudios']);
  }

}
