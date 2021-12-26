import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EstudioService } from 'src/app/services/estudio.service';
import { MedicoDerivanteService } from 'src/app/services/medico-derivante.service';

@Component({
  selector: 'app-grilla-estudios',
  templateUrl: './grilla-estudios.component.html',
  styleUrls: ['./grilla-estudios.component.css']
})
export class GrillaEstudiosComponent implements OnInit {


  // Variables del componente
  estudio = {};
  pageSize="5";
  fromItem:number=0;
  toItem:number=5;
  estudios:any[] = [];
  estudios2:any;
  search: String='';
  estudiosOriginal:any[] = [];

  constructor(
    private medicoDerivanteService: MedicoDerivanteService,
    private router: Router,
    private estudioService: EstudioService,

  ) { }




  // Rutinas

  changePage(e:PageEvent){
    this.fromItem = e.pageIndex * e.pageSize;
    this.toItem = this.fromItem + e.pageSize
  }
  verEstudio = (id:any) => {
    this.router.navigate([`/detalles-estudio/${id}`]);
  }
  buscarEstudio(){
    let tamano= this.search.length
    const filter = (typeof this.search == 'string' && this.search.length > 0 ) ? `?searchBy=${this.search}` : ''
    this.estudios=
    this.estudiosOriginal.filter(est =>{
      est.paciente
      return est.paciente.slice(0,tamano) == this.search

    })
  }

  getEstudios = () => {
// 2021-12-25 - Acá hay que pasarle el ID del paciente (se podria tomar desde el local storage) y hacer que levante solo los estudios.
// hay un endpoint ya creado para pasarle el dato por header
    let pacienteid = localStorage.getItem('userid')
    this.estudioService.getEstudiosPaciente(pacienteid)
      .subscribe((estudios) => {
        for (var i = 0; i < estudios.length; i++) {
          let est = {
            "id" : estudios[i]._id,
            "paciente" : estudios[i].paciente.email,
            "medico" : estudios[i].medicoDerivante.email,
            "tipo" : estudios[i].tipoDeEstudio.nombre,
            "tipoDiagnostico" : estudios[i].diagnosticoPresuntivo.nombre,
            "detalleDiagnostico" : estudios[i].detalleDelDiagnostico,
            "estado" : "falta implementar",
          }
          this.estudios.push(est)
        }
        this.estudiosOriginal=this.estudios
      })

    return true
  }
  addEstudio = () => {
    this.router.navigate(['/alta-estudio']);
  }
  editMedicoDerivante = (event:any, item:any) => {
    this.router.navigate([`/editar-medico-derivante/${item._id}`]);
  }
  deleteMedicoDerivante = (id:string) => {
    let idMedico= {'_id': id}
    this.medicoDerivanteService.deleteMedicoDerivante(idMedico).subscribe(() => this.getEstudios())

  }
  ngOnInit(): void {
    this.getEstudios()
    this.buscarEstudio()

  }

}

