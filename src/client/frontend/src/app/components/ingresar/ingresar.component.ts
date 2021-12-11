import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {


  usuario = {
    email : '',
    password : ''
  }
  constructor(
    private authService : AuthService,
    private router: Router) { }



  ngOnInit(): void {
  }

  ingresar(){
    this.authService.ingresar(this.usuario).subscribe(res => {
      localStorage.setItem('userid', res.userid);
      localStorage.setItem('rol', res.rol);
      localStorage.setItem('userEmail', this.usuario.email);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/tareas-privadas']);
    },
    err => {
      console.log(err);
    });
  }

}
