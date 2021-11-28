import { Paciente } from './../alta-estudio/Empleado';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { EstudioService } from 'src/app/services/estudio.service';
import { MedicoDerivanteService } from 'src/app/services/medico-derivante.service';

@Component({
  selector: 'app-listar-estudios',
  templateUrl: './listar-estudios.component.html',
  styleUrls: ['./listar-estudios.component.css']
})
export class ListarEstudiosComponent implements OnInit {

  pageSize="5";
  fromItem:number=0;
  toItem:number=5;
  estudios:any[] = [];
  estudios2:any;
  search: String='';
  estudiosOriginal:any[] = [];

  changePage(e:PageEvent){
    this.fromItem = e.pageIndex * e.pageSize;
    this.toItem = this.fromItem + e.pageSize
  }
  constructor(
    private medicoDerivanteService: MedicoDerivanteService,
    private router: Router,
    private estudioService: EstudioService,

  ) { }

  getEstudios = () => {
    //this.medicoDerivanteService.getMedicoDerivante()
    //  .subscribe((resp) => this.items = resp)
    this.estudioService.getEstudios()
      .subscribe((estudios) => {
        for (var i = 0; i < estudios.length; i++) {
          console.log(estudios[i])
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
    console.log("Se va a devolver un array de estudios")
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
  verEstudio = (id:any) => {
    this.router.navigate([`/detalles-estudio/${id}`]);
  }
  ngOnInit(): void {
    this.getEstudios()
    this.buscarEstudio()

  }

  buscarEstudio(){
    let tamano= this.search.length
    const filter = (typeof this.search == 'string' && this.search.length > 0 ) ? `?searchBy=${this.search}` : ''
    // this.estudioService.getAll(filter).subscribe(
    //   (estudios)=>{
    //     for (var i = 0; i < estudios.length; i++) {
    //       console.log(estudios[i])
    //     let est = {arch
    //       "id" : estudios[i]._id,
    //       "paciente" : estudios[i].paciente.email,
    //       "medico" : estudios[i].medicoDerivante.email,
    //       "tipo" : estudios[i].tipoDeEstudio.nombre,
    //       "tipoDiagnostico" : estudios[i].diagnosticoPresuntivo.nombre,
    //       "detalleDiagnostico" : estudios[i].detalleDelDiagnostico,
    //       "estado" : "falta implementar",
    //     }
    //     this.estudios.push(est)
    //   }
    //   },
    //   (error) =>{
    //     console.error('Error ->', error)
    //   }

    //)
    console.log( 'se escribio una letra: ' + this.search )
    this.estudios=
    this.estudiosOriginal.filter(est =>{
      est.paciente
      return est.paciente.slice(0,tamano) == this.search

    })

  }


}


