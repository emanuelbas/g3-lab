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

  changePage(e:PageEvent){
    this.fromItem = e.pageIndex * e.pageSize;
    this.toItem = this.fromItem + e.pageSize
  }
  constructor(
    private medicoDerivanteService: MedicoDerivanteService,
    private router: Router,
    private estudioService: EstudioService
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
  }


}
