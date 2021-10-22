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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}