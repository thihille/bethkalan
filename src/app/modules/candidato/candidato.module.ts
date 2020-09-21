import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoRoutingModule } from './candidato.routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VagasComponent } from './components/vagas/vagas.component';
import { VagasDetalhesComponent } from './components/vagas-detalhes/vagas-detalhes.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SendCvComponent } from 'src/app/send-cv/send-cv.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MenuCandidatoComponent } from './shared/components/menu-candidato/menu-candidato.component';
import { PerfilComponent } from './components/perfil/perfil.component';


@NgModule({
  declarations: [
    MenuCandidatoComponent,
    DashboardComponent,
    PerfilComponent,
    VagasComponent,
    VagasDetalhesComponent,
    SendCvComponent
  ],
  imports: [
    CommonModule,
    CandidatoRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TextMaskModule,
    CurrencyMaskModule
  ]
})
export class CandidatoModule { }
