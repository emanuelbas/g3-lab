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
  estudio: any = {
    ID_EMP: '',
    ID_PAC: '',
    ID_MED: '',
    ID_TIP_EST: '',
    ID_DIA_PRESU: '',
    DETALLE: ''
  }
  seleccionado = (new Empleado("", ""));
  empleado = (new Empleado("", ""))

  pacienteSeleccionado = (new Empleado("", ""));
  paciente = (new Empleado("", ""))

  medicoSeleccionado = (new Empleado("", ""));
  medico = (new Empleado("", ""))

  tipoSeleccionado = (new Empleado("", ""));
  tipo = (new Empleado("", ""))

  diagnosticoSeleccionado = (new Empleado("", ""));
  diagnostico = (new Empleado("", ""))

  empleados: Empleado[] = []
  pacientes: Empleado[] = []
  medicos: Empleado[] = []
  tipos: Empleado[] = []
  diagnosticos: Empleado[] = []

  constructor(private estudioService: EstudioService,
    private router: Router,
    private route: ActivatedRoute) { }

  getTipos = () => {
    this.estudioService.getTiposDeEstudio()
      .subscribe((resp) => { this.tipos = resp })
  }

  getDiagnosticos = () => {
    this.estudioService.getDiagnosticos()
      .subscribe((resp) => { this.diagnosticos = resp })
  }

  getEmpleados = () => {
    this.estudioService.getEmpleados()
      .subscribe((empleados) => {

        for (var i = 0; i < empleados.length; i++) {
          this.empleados.push(new Empleado(empleados[i]._id, empleados[i].email))
        }

      })
  }

  getPacientes = () => {
    this.estudioService.getPacientes()
      .subscribe((pacientes) => {

        for (var i = 0; i < pacientes.length; i++) {
          this.pacientes.push(new Empleado(pacientes[i]._id, pacientes[i].email))
        }

      })
  }

  getMedicos = () => {
    this.estudioService.getMedicos()
      .subscribe((medicos) => {

        for (var i = 0; i < medicos.length; i++) {
          this.medicos.push(new Empleado(medicos[i]._id, medicos[i].email))
        }

      })
  }



  onSubmit(formEstudio: NgForm) {
    //console.log(formEstudio.value)
    this.estudioService.createEstudio(formEstudio.value).subscribe(()=>this.backNavigate())
  }
  backNavigate = () => {
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.getTipos()
    this.getDiagnosticos()
    this.getEmpleados()
    this.getPacientes()
    this.getMedicos()
  }


}
