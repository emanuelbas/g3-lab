import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.css']
})
export class AltaEmpleadoComponent implements OnInit {
  editMode = false;
  user:any = {
    email:'',
    nombre:'',
    apellido:'',
    telefono:''
  }

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  getEmpleado = (id: string) => {
    this.empleadoService.getEmpleadoById(id)
      .subscribe((resp) => resp.map((usr:any) => this.user = usr))
  }

  backNavigate = () => {
    this.router.navigate(['/']);
  }

  onSubmit( formEmpleado: NgForm ){
    console.log("Entre al submit")
    console.log("Entry",this.editMode)
    console.log("ES VALIDO?: " + formEmpleado.invalid)
    if(!formEmpleado.invalid){
      !this.editMode ?
        this.empleadoService.createEmpleado(formEmpleado.value).subscribe(res =>{
          console.log("Me fui al create")
          this.backNavigate()
        })
        : this.empleadoService.updateEmpleado({...formEmpleado.value, '_id':this.user._id}).subscribe(res =>{
          console.log("Me fui al update")
          this.backNavigate()
          })

    }else{
      Object.values(formEmpleado.controls).forEach(control=> {
        control.markAsTouched();
      })
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('id')){
        this.editMode = true
        let id:string = params.get('id') ? params.get('id')! : ''
        this.getEmpleado(id)
      }
    });
  }

}
