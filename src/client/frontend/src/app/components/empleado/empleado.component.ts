import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EmpleadoService } from 'src/app/services/empleado.service';
import  { Router} from '@angular/router'

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  pageSize="5";
  fromItem:number=0;
  toItem:number=5;
  items:any[] = [];
  changePage(e:PageEvent){
    this.fromItem = e.pageIndex * e.pageSize;
    this.toItem = this.fromItem + e.pageSize
  }
  constructor(
  private empleadoService: EmpleadoService,
  private router: Router){}

  getEmpleado = () => {
    this.empleadoService.getEmpleado()
      .subscribe((resp) => this.items = resp)
  }
  addEmpleado = () => {
    this.router.navigate(['/alta-empleado']);
  }
  editEmpleado = (event:any, item:any) => {
    this.router.navigate([`/editar-empleado/${item._id}`]);
  }
  deleteEmpleado = (id:string) => {
    let idEmpleado= {'_id': id}
    this.empleadoService.deleteEmpleado(idEmpleado).subscribe(() => this.getEmpleado())

  }


  ngOnInit(): void {
  }





}








