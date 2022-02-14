import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

// componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { JugCrearEditarComponent } from './components/jugador/jug-crear-editar/jug-crear-editar.component';
import { JugVerComponent } from './components/jugador/jug-ver/jug-ver.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { DirCrearEditarComponent } from './components/dirigente/dir-crear-editar/dir-crear-editar.component';
import { EntCrearEditarComponent } from './components/entrenador/ent-crear-editar/ent-crear-editar.component';
import { EntVerComponent } from './components/entrenador/ent-ver/ent-ver.component';
import { DirVerComponent } from './components/dirigente/dir-ver/dir-ver.component';
import { CluCrearEditarComponent } from './components/club/clu-crear-editar/clu-crear-editar.component';
import { CarCrearEditarComponent } from './components/cargo/car-crear-editar/car-crear-editar.component';
import { CarVerComponent } from './components/cargo/car-ver/car-ver.component';
import { CluVerComponent } from './components/club/clu-ver/clu-ver.component';
import { DatePipe } from '@angular/common';
import { PrePdfComponent } from './components/pdf/pre-pdf/pre-pdf.component';
import { JugadoresPdfComponent } from './components/pdf/jugadores-pdf/jugadores-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JugCrearEditarComponent,
    JugVerComponent,
    BienvenidaComponent,
    DirCrearEditarComponent,
    EntCrearEditarComponent,
    EntVerComponent,
    DirVerComponent,
    CluCrearEditarComponent,
    CarCrearEditarComponent,
    CarVerComponent,
    CluVerComponent,
    PrePdfComponent,
    JugadoresPdfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
