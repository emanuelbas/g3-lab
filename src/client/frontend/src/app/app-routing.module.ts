import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TareasComponent } from './components/tareas/tareas.component';
import { TareasPrivadasComponent } from './components/tareas-privadas/tareas-privadas.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import {AltaEmpleadoComponent} from './components/empleado/alta-empleado/alta-empleado.component';


import { E403AccesoNoPermitidoComponent } from './components/ventanas-error/e403-acceso-no-permitido/e403-acceso-no-permitido.component';
import { AltaMedicoDerivanteComponent } from './components/medico-derivante/alta-medico-derivante/alta-medico-derivante.component'
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component'

import { AuthGuard } from './auth.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/tareas',
    pathMatch: 'full'
  },
  {
    path: 'tareas',
    component: TareasComponent
  },
  {
    path: 'alta-medico-derivante',
    component: AltaMedicoDerivanteComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'tareas-privadas',
    component: TareasPrivadasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ingresar',
    component: IngresarComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  },
  {
    path: '403',
    component: E403AccesoNoPermitidoComponent
  },
  {
    path: 'home',
    component: PaginaPrincipalComponent
  },
  {
    path: 'alta-empleado',
    component: AltaEmpleadoComponent,
    canActivate: [AdminGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
