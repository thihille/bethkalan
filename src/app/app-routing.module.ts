import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BusinessComponent } from './business/business.component';

const routes: Routes = [
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'para-empresas', component: BusinessComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
