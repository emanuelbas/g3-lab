import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareasPrivadasComponent } from './components/tareas-privadas/tareas-privadas.component';
import { AltaMedicoDerivanteComponent } from './components/medico-derivante/alta-medico-derivante/alta-medico-derivante.component';
import { MedicoDerivanteComponent } from './components/medico-derivante/medico-derivante.component';
import { PacienteComponent } from './components/paciente/paciente.component';


import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AltaEmpleadoComponent } from './components/empleado/alta-empleado/alta-empleado.component';
import { E403AccesoNoPermitidoComponent } from './components/ventanas-error/e403-acceso-no-permitido/e403-acceso-no-permitido.component';
import { E404PaginaNoEncontradaComponent } from './components/ventanas-error/e404-pagina-no-encontrada/e404-pagina-no-encontrada.component';
import { SitioEnMantenimientoComponent } from './components/ventanas-error/sitio-en-mantenimiento/sitio-en-mantenimiento.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { EditarEmpleadoComponent } from './components/empleado/editar-empleado/editar-empleado.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { ListarEstudiosComponent } from './components/estudios/listar-estudios/listar-estudios.component';
import { DetallesDeEstudioComponent } from './components/estudios/detalles-de-estudio/detalles-de-estudio.component';
import { AltaEstudioComponent } from './components/estudios/alta-estudio/alta-estudio.component';
import { ReportesComponent } from './components/reportes/reportes.component';

import { NgxChartsModule } from '@swimlane/ngx-charts'
import { AltaPacienteComponent } from './components/paciente/alta-paciente/alta-paciente.component';
import { PacientePublicoComponent } from './components/paciente-publico/paciente-publico.component';
import { AltaPacientePublicoComponent } from './components/paciente-publico/alta-paciente-publico/alta-paciente-publico.component';
import { GrillaEstudiosComponent } from './components/paciente/grilla-estudios/grilla-estudios.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    IngresarComponent,
    TareasComponent,
    TareasPrivadasComponent,
    AltaEmpleadoComponent,
    E403AccesoNoPermitidoComponent,
    E404PaginaNoEncontradaComponent,
    SitioEnMantenimientoComponent,
    TareasPrivadasComponent,
    AltaMedicoDerivanteComponent,
    MedicoDerivanteComponent,
    PaginaPrincipalComponent,
    EditarEmpleadoComponent,
    EmpleadoComponent,
    ListarEstudiosComponent,
    DetallesDeEstudioComponent,
    AltaEstudioComponent,
    ReportesComponent,
    PacienteComponent,
    AltaPacienteComponent,
    PacientePublicoComponent,
    AltaPacientePublicoComponent,
    GrillaEstudiosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    NgxChartsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          