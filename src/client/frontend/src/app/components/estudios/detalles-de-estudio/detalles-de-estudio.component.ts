import { Component, OnInit } from '@angular/core';
import { EstudioService } from '../../../services/estudio.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Estudio } from '../../../models/estudio'
//import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-detalles-de-estudio',
  templateUrl: './detalles-de-estudio.component.html',
  styleUrls: ['./detalles-de-estudio.component.css']
})
export class DetallesDeEstudioComponent implements OnInit {

  //formTurnos: FormGroup;
  estudio:any = {
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
  listas:any[]= [];
  minDate : String = new Date().toISOString().split('T')[0]
  fechaSeleccionada = ''
  turnoSeleccionado: any | undefined
  fechasDisponibles = [new Date(), new Date(), new Date(), new Date()]

  //historial:any[] = [];
  //lista:string[]=["hola","que","tal","estas"];
  constructor(
    public estudioService: EstudioService,
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
        this.listas=this.listas.sort((a, b) =>{let fecha1=new Date(a.fechaInicio).getTime();let fecha2=new Date(b.fechaInicio).getTime();if (fecha1 < fecha2){return -1} else {return 1} })
        console.log(this.listas)
        this.estudioConEstado = new Estudio(this.estudio.estado.nombre)
      })
  }


//fileupload
uploadedFiles: Array < File > = [];
    fileChange(element:any) {
      this.uploadedFiles = element.target.files;
    }

  upload(idEstudio:any) {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.estudioService.subirComprobante(formData,idEstudio).subscribe((response) => {
      this.estudioConEstado.siguiente(idEstudio,this.estudioService)
    })
}

uploadCIF(idEstudio:any) {
  let formData = new FormData();
  for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
  }
  this.estudioService.subirCIF(formData,idEstudio).subscribe((response) => {
    this.estudioConEstado.siguiente(idEstudio,this.estudioService)
  })
}

submitFecha(){
  alert("ok el submit")
}
guardaFecha(fecha:any){
  this.fechaSeleccionada = fecha
}
seleccionarTurno(turno:any){
  this.turnoSeleccionado = turno
}
registrarTurno(){
  alert(this.turnoSeleccionado.value)
}
//file upload

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('id')){
        let id:string = params.get('id') ? params.get('id')! : ''
        this.getEstudioById(id)
      }
    });
  }
  backNavigate = () => {
    this.router.navigate(['/listar-estudios']);
  }

}
