import { Component, OnInit } from '@angular/core';
import { EstudioService } from '../../../services/estudio.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detalles-de-estudio',
  templateUrl: './detalles-de-estudio.component.html',
  styleUrls: ['./detalles-de-estudio.component.css']
})
export class DetallesDeEstudioComponent implements OnInit {

  estudio:any = {
    _id: '',
    nombre_paciente: '',
    nombre_medico_derivante: '',
    nombre_tipo_estudio: '',
    diagnostico_presuntivo: '',
    detalle_diagnostico: '',
    estado_actual: '',
    historial: ''
  }


  constructor(
    private estudioService: EstudioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  getEstudioById = (id: string) => {
    this.estudioService.getEstudioById(id)
      .subscribe((resp) => {this.estudio = resp;console.log(this.estudio)} )
  }


  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('id')){
        let id:string = params.get('id') ? params.get('id')! : ''
        this.getEstudioById(id)
      }
    });
  }

}
