import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  constructor(
    private authService : AuthService,
    private router: Router) { }

  

  ngOnInit(): void {
  }

  registrar(){
    this.authService.registrar(this.usuario).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/tareas-privadas']);
    },
    err => {
      console.log(err);
    });
  }


}
