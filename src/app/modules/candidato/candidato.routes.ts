import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VagasComponent } from './components/vagas/vagas.component';
import { VagasDetalhesComponent } from './components/vagas-detalhes/vagas-detalhes.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/curriculos', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/vagas-inscritas', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'vagas', component: VagasComponent },
  { path: 'vaga/:id', component: VagasDetalhesComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CandidatoRoutingModule { }
