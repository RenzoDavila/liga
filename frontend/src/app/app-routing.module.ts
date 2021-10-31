import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { CluCrearEditarComponent } from './components/club/clu-crear-editar/clu-crear-editar.component';
import { DirCrearEditarComponent } from './components/dirigente/dir-crear-editar/dir-crear-editar.component';
import { DirVerComponent } from './components/dirigente/dir-ver/dir-ver.component';
import { EntCrearEditarComponent } from './components/entrenador/ent-crear-editar/ent-crear-editar.component';
import { EntVerComponent } from './components/entrenador/ent-ver/ent-ver.component';
import { JugCrearEditarComponent } from './components/jugador/jug-crear-editar/jug-crear-editar.component';
import { JugVerComponent } from './components/jugador/jug-ver/jug-ver.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'jugador', component: JugVerComponent },
  { path: 'crear-jugador', component: JugCrearEditarComponent },
  { path: 'editar-jugador/:id', component: JugCrearEditarComponent },
  { path: 'entrenador', component: EntVerComponent },
  { path: 'crear-entrenador', component: EntCrearEditarComponent },
  { path: 'editar-entrenador/:id', component: EntCrearEditarComponent },
  { path: 'dirigente', component: DirVerComponent },
  { path: 'crear-dirigente', component: DirCrearEditarComponent },
  { path: 'editar-dirigente/:id', component: DirCrearEditarComponent },
  { path: 'crear-club', component: CluCrearEditarComponent },
  { path: 'editar-club/:id', component: CluCrearEditarComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
