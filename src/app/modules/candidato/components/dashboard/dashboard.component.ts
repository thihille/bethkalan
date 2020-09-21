import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../../../../services/credentials/credentials.service';
import { decodeToken } from '../../../../shared/utils/token';
import { ICandidato } from '../../../../models/candidato.model';
import { FormGroup, FormControl } from '@angular/forms';
import { maskCPF, maskCelular } from '../../../../shared/utils/input-validates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formCandidato: FormGroup;

  public inputCPF = null;  
  public modelCPF: any = maskCPF;
  public modelCelular: any = maskCelular;

  private user:ICandidato = null;

  public valorMinimoAceitavel: number = null;
  public valorDesejavel: number = null;

  public estados = [
    {"nome": "Acre", "sigla": "AC"},
    {"nome": "Alagoas", "sigla": "AL"},
    {"nome": "Amapá", "sigla": "AP"},
    {"nome": "Amazonas", "sigla": "AM"},
    {"nome": "Bahia", "sigla": "BA"},
    {"nome": "Ceará", "sigla": "CE"},
    {"nome": "Distrito Federal", "sigla": "DF"},
    {"nome": "Espírito Santo", "sigla": "ES"},
    {"nome": "Goiás", "sigla": "GO"},
    {"nome": "Maranhão", "sigla": "MA"},
    {"nome": "Mato Grosso", "sigla": "MT"},
    {"nome": "Mato Grosso do Sul", "sigla": "MS"},
    {"nome": "Minas Gerais", "sigla": "MG"},
    {"nome": "Pará", "sigla": "PA"},
    {"nome": "Paraíba", "sigla": "PB"},
    {"nome": "Paraná", "sigla": "PR"},
    {"nome": "Pernambuco", "sigla": "PE"},
    {"nome": "Piauí", "sigla": "PI"},
    {"nome": "Rio de Janeiro", "sigla": "RJ"},
    {"nome": "Rio Grande do Norte", "sigla": "RN"},
    {"nome": "Rio Grande do Sul", "sigla": "RS"},
    {"nome": "Rondônia", "sigla": "RO"},
    {"nome": "Roraima", "sigla": "RR"},
    {"nome": "Santa Catarina", "sigla": "SC"},
    {"nome": "São Paulo", "sigla": "SP"},
    {"nome": "Sergipe", "sigla": "SE"},
    {"nome": "Tocantins", "sigla": "TO"}
  ];

  public stateSelected: string = null;

  constructor(public credentialService:CredentialsService, private router: Router) {
    this.user = decodeToken();
    this.stateSelected = this.user.state;
  }

  navigateTo(route){
    this.router.navigate(['/dashboard'+route])
  }

  ngOnInit() {
    this.createForm(this.user);
  }

  createForm(candidato: ICandidato){
    this.formCandidato = new FormGroup({
      id: new FormControl(candidato.id),
      name: new FormControl(candidato.name),
      cellPhone: new FormControl(candidato.cellPhone),
      city: new FormControl(candidato.city),
      state: new FormControl(candidato.state),
      cpf: new FormControl(candidato.cpf),
      email: new FormControl(candidato.email),
      idToken: new FormControl(candidato.idToken),
      idealSalary: new FormControl(candidato.idealSalary),
      minSalary: new FormControl(candidato.minSalary),
      position: new FormControl(candidato.position),
      segment: new FormControl(candidato.segment),
      storeTypePreference: new FormControl(candidato.storeTypePreference),
      type: new FormControl(candidato.type)
    })
  }

  onSubmit(){
    console.log(this.formCandidato.value);
  }

  logout(){
    this.credentialService.disconnect();
  }

  compareEstado(id1: string, id2: string): boolean {
    return id1 === id2;
  }

}
