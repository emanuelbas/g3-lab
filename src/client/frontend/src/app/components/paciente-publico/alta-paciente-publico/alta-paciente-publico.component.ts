import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { FormsModule }   from '@angular/forms';



@Component({
  selector: 'app-alta-paciente-publico',
  templateUrl: './alta-paciente-publico.component.html',
  styleUrls: ['./alta-paciente-publico.component.css']
})
export class AltaPacientePublicoComponent implements OnInit {
  edad: any;
  editMode = false;
  user:any = {
    nombre:'',
    apellido:'',
    fecha_nacimiento:'',
    dni:'',
    password1:'',
    password2:'',
    tutorName:'',
    tutorSurname:'',
    tutorDireccion:'',
    tutorEmail:''
  }
  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getPaciente = (id: string) => {
    this.pacienteService.getPacienteById(id)
      .subscribe((resp) => resp.map((usr:any) => this.user = usr))
  }

  backNavigate = () => {
    this.router.navigate(['/']);
  }
  calcularEdad = (fecha:any) => {
    let fechaNac = new Date(fecha.value)
    var timeDiff = Math.abs(Date.now() - new Date(fechaNac).getTime());
    this.edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }
  onSubmit( formPaciente: NgForm ){
// en formPaciente.value.algo tengo los datos
    console.log(formPaciente.value)
    return
    if(!formPaciente.invalid){
      !this.editMode ?
        this.pacienteService.createPaciente(formPaciente.value).subscribe(res =>{
          console.log("Me fui al create")
          this.backNavigate()
        })
        : this.pacienteService.updatePaciente({...formPaciente.value, '_id':this.user._id}).subscribe(res =>{
          console.log("Me fui al update")
          this.backNavigate()
          })

    }else{
      Object.values(formPaciente.controls).forEach(control=> {
        control.markAsTouched();
      })
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.get('id')){
        this.editMode = true
        let id:string = params.get('id') ? params.get('id')! : ''
        this.getPaciente(id)
      }
    });
  }

}
