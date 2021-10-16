import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareasPrivadasComponent } from './components/tareas-privadas/tareas-privadas.component';
import { AltaMedicoDerivanteComponent } from './components/medico-derivante/alta-medico-derivante/alta-medico-derivante.component';
import { MedicoDerivanteComponent } from './components/medico-derivante/medico-derivante.component';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AltaEmpleadoComponent } from './components/alta-empleado/alta-empleado.component';
import { E403AccesoNoPermitidoComponent } from './components/ventanas-error/e403-acceso-no-permitido/e403-acceso-no-permitido.component';
import { E404PaginaNoEncontradaComponent } from './components/ventanas-error/e404-pagina-no-encontrada/e404-pagina-no-encontrada.component';
import { SitioEnMantenimientoComponent } from './components/ventanas-error/sitio-en-mantenimiento/sitio-en-mantenimiento.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';

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
    PaginaPrincipalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
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
