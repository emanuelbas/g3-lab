import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PacienteService } from 'src/app/services/paciente.service';
import  { Router} from '@angular/router'
@Component({
  selector: 'app-alta-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit
{
  pageSize="5";
  fromItem:number=0;
  toItem:number=5;
  // items:any[] = [];
  pacientes:any[] = [];
  pacientesOriginal:any[] = [];
  changePage(e:PageEvent){
    this.fromItem = e.pageIndex * e.pageSize;
    this.toItem = this.fromItem + e.pageSize
  }
  constructor( private pacienteService: PacienteService, private router: Router){

  }

  getPaciente = () => {
    console.log("entre al get");
    // this.pacienteService.getPaciente()
    //   .subscribe((resp) => this.items = resp)
    this.pacienteService.getPaciente()
      .subscribe((pacientes) => {
        for (var i = 0; i < pacientes.length; i++) {
          let user = {
            "email": pacientes[i].email,
            "nombre" : pacientes[i].paciente.nombre,
            "apellido" : pacientes[i].paciente.apellido,
            "obraSocial" : pacientes[i].paciente.obraSocial,
          }
          this.pacientes.push(user)
        }
        this.pacientesOriginal=this.pacientes
      })

    return true
  }
  addPaciente = () => {
    this.router.navigate(['/alta-paciente']);
  }
  editPaciente = (event:any, item:any) => {
    this.router.navigate([`/editar-paciente/${item._id}`]);
  }
  deletePaciente = (id:string) => {
    let idPaciente= {'_id': id}
    this.pacienteService.deletePaciente(idPaciente).subscribe(() => this.getPaciente())

  }

  ngOnInit(): void 
  {
    this.getPaciente()
  }

}