import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
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
  estudios:any[] = [{paciente : "hola", medico: "como", tipo: "te", tipoDiagnostico: "va", detalleDiagnostico: "todo", estado: "bien"},
  {paciente : "hola", medico: "como", tipo: "te", tipoDiagnostico: "va", detalleDiagnostico: "todo", estado: "bien"},{paciente : "hola", medico: "como", tipo: "te", tipoDiagnostico: "va", detalleDiagnostico: "todo", estado: "bien"},{paciente : "hola", medico: "como", tipo: "te", tipoDiagnostico: "va", detalleDiagnostico: "todo", estado: "bien"},{paciente : "hola", medico: "como", tipo: "te", tipoDiagnostico: "va", detalleDiagnostico: "todo", estado: "bien"},{paciente : "hola", medico: "como", tipo: "te", tipoDiagnostico: "va", detalleDiagnostico: "todo", estado: "bien"}
];

  changePage(e:PageEvent){
    this.fromItem = e.pageIndex * e.pageSize;
    this.toItem = this.fromItem + e.pageSize
  }
  constructor(
    private medicoDerivanteService: MedicoDerivanteService,
    private router: Router
  ) { }

  getEstudios = () => {
    //this.medicoDerivanteService.getMedicoDerivante()
    //  .subscribe((resp) => this.items = resp)
    console.log("Se va a devolver un array de estudios")
    return [{paciente : "hola", medico: "como", tipo: "te", tipoDiagnostico: "va", detalleDiagnostico: "todo", estado: "bien"},
    {paciente : "hola", medico: "como", tipo: "te", tipoDiagnostico: "va", detalleDiagnostico: "todo", estado: "bien"}
  ]

  }
  addEstudio = () => {
    this.router.navigate(['/alta-medico-derivante']);
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
  }


}
