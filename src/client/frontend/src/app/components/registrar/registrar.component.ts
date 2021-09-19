import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {


  usuario = {
    email : '',
    password : ''
  }
  constructor(private authService : AuthService) { }

  

  ngOnInit(): void {
  }

  registrar(){
    this.authService.registrar(this.usuario).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
  }


}
