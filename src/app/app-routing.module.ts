import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  { path: 'sobre-nos', component: AboutComponent },
  { path: 'para-empresas', component: HomeComponent },
  { path: 'area-do-candidato', component: HomeComponent },
  { path: 'vagas', component: JobsComponent },
  { path: 'vaga/:id', component: JobDescriptionComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
