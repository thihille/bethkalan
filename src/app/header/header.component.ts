import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import 'moment/min/locales';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showLogo;

  public mydate = null;

  public items = [
    {
      label: 'Quem somos',
      url: '/sobre-nos',
      privateRoute: false
    },
    {
      label: 'Para Empresas',
      url: '/para-empresas',
      privateRoute: false
    },
    {
      label: 'Buscar vagas',
      url: '/vagas',
      privateRoute: false
    },
    {
      label: 'Área do Candidato',
      url: '/area-do-candidato',
      privateRoute: false
    }    
  ]

  constructor() {
    this.mydate = moment().locale('pt-br').format('LLLL');
  }

  ngOnInit() {
  }

  goToBethKalan() {
    window.open("http://bethkalan.com.br/", "_blank");
  }

}
