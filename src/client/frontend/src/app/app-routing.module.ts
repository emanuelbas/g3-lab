import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TareasComponent } from './components/tareas/tareas.component';
import { TareasPrivadasComponent } from './components/tareas-privadas/tareas-privadas.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import {AltaEmpleadoComponent} from './components/empleado/alta-empleado/alta-empleado.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';//duda


import { E403AccesoNoPermitidoComponent } from './components/ventanas-error/e403-acceso-no-permitido/e403-acceso-no-permitido.component';
import { MedicoDerivanteComponent } from './components/medico-derivante/medico-derivante.component';

import { AltaMedicoDerivanteComponent } from './components/medico-derivante/alta-medico-derivante/alta-medico-derivante.component'
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { ListarEstudiosComponent } from './components/estudios/listar-estudios/listar-estudios.component';
import { DetallesDeEstudioComponent } from './components/estudios/detalles-de-estudio/detalles-de-estudio.component';
import { AltaEstudioComponent } from './components/estudios/alta-estudio/alta-estudio.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { AltaPacienteComponent } from './components/paciente/alta-paciente/alta-paciente.component'


import { AuthGuard } from './auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { EmpleadoGuard } from './guards/empleado.guard';
import { ConfiguradorGuard } from './guards/configurador.guard';
import { PacienteGuard } from './guards/paciente.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'tareas',
    component: TareasComponent
  },
  {
    path: 'medicos-derivantes',
    component: MedicoDerivanteComponent,
    canActivate: [AuthGuard, ConfiguradorGuard]
  },
  {
    path: 'empleado',
    component: EmpleadoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alta-medico-derivante',
    component: AltaMedicoDerivanteComponent,
    canActivate: [AuthGuard, ConfiguradorGuard]
  },
  {
    path: 'editar-medico-derivante/:id',
    component: AltaMedicoDerivanteComponent,
    canActivate: [AuthGuard, ConfiguradorGuard]
  },
  {
    path: 'tareas-privadas',
    component: PaginaPrincipalComponent,
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
  },
  {
    path: 'listar-estudios',
    component: ListarEstudiosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detalles-estudio/:id',
    component: DetallesDeEstudioComponent,
    canActivate: []
  },
  {
    path: 'alta-estudio',
    component: AltaEstudioComponent,
    canActivate: []
  }, 
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alta-paciente',
    component: AltaPacienteComponent,
    canActivate: []
  },
  {
    path: 'listar-pacientes',
    component: PacienteComponent,
    canActivate: []
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
