import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EstudioService } from 'src/app/services/estudio.service';
import { Empleado } from './Empleado'

@Component({
  selector: 'app-alta-estudio',
  templateUrl: './alta-estudio.component.html',
  styleUrls: ['./alta-estudio.component.css']
})
export class AltaEstudioComponent implements OnInit {
  estudio:any = {
    ID_EMP:'',
    ID_PAC:'',
    ID_MED:'',
    ID_TIP_EST:'',
    ID_DIA_PRESU:'',
    DETALLE:''
  }
  seleccionado = (new Empleado("",""));
  empleado = (new Empleado("",""))

  pacienteSeleccionado = (new Empleado("",""));
  paciente = (new Empleado("",""))

  medicoSeleccionado = (new Empleado("",""));
  medico = (new Empleado("",""))

  tipoSeleccionado = (new Empleado("",""));
  tipo = (new Empleado("",""))

  diagnosticoSeleccionado = (new Empleado("",""));
  diagnostico = (new Empleado("",""))

  empleados: Empleado[] = []
  pacientes: Empleado[] = []
  medicos  : Empleado[] = []
  tipos    : Empleado[] = []
  diagnosticos  : Empleado[] = []

  constructor(    private estudioService: EstudioService,
    private router: Router,
    private route: ActivatedRoute) { }


  
  onSubmit( formEstudio: NgForm ){
    console.log(formEstudio.value)
    console.log(formEstudio.value.EMPLEADO)
    console.log(formEstudio.value.PACIENTE)
    console.log(formEstudio.value.MEDICO)
  }
  backNavigate = () => {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.empleados.push(new Empleado("1","Pepe"))
    this.empleados.push(new Empleado("2","Juan"))
    this.empleados.push(new Empleado("3","Luis"))

    this.pacientes.push(new Empleado("1","Lucia"))
    this.pacientes.push(new Empleado("2","Lautaro"))
    this.pacientes.push(new Empleado("3","Rodrigo"))

    this.medicos.push(new Empleado("1","Dr. Andres"))
    this.medicos.push(new Empleado("2","Dra. Laura"))
    this.medicos.push(new Empleado("3","Dra. Mercedes"))

    this.tipos.push(new Empleado("1","Exoma"))
    this.tipos.push(new Empleado("2","Mitocondria"))
    this.tipos.push(new Empleado("3","Genoma"))

    this.diagnosticos.push(new Empleado("1","Pie de atleta"))
    this.diagnosticos.push(new Empleado("2","Prostatitis"))
    this.diagnosticos.push(new Empleado("3","Síndrome de Wolfram"))

  }
  

}
