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
  items:any[] = [];
  changePage(e:PageEvent){
    this.fromItem = e.pageIndex * e.pageSize;
    this.toItem = this.fromItem + e.pageSize
  }
  constructor( private pacienteService: PacienteService, private router: Router){

  }

  getPaciente = () => {
    this.pacienteService.getPaciente()
      .subscribe((resp) => this.items = resp)
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
  }

}