import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumService } from '../services/curriculum/curriculum.service';
import { ContactService } from '../services/contact/contact.service';
import { NotificationService } from '../services/notification/notification.service';
import { MailService } from '../services/mail/mail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('file', { static: false }) file;

  public files: Set<File> = new Set();

  isCompany = false;
  step = 1;

  companyData = {
    companyName: null,
    razaoSocial: null,
    cnpj: null,
    contact: null,
    contactName: null,
    contactPosition: null,
    email: null
  };

  employeeData = {
    createdAt: null,
    segment: null,
    name: null,
    cpf: null,
    city: null,
    state: null,
    minSalary: null,
    idealSalary: null,
    firstShopping: null,
    secondShopping: null,
    thirdShopping: null,
    storeTypePreference: null,
    curriculum: null,
    email: null,
    cellPhone: null,
    position: null
  };

  companyDataSent = false;

  isOtherSegment = false;

  isShowRoom = false;
  isStreetStore = false;
  isShopping = false;

  constructor(
    private router: Router,
    private curriculumService: CurriculumService,
    private contactService: ContactService,
    private notificationService: NotificationService,
    private mailService: MailService
  ) { }

  ngOnInit() {
    if(this.router.url.indexOf('company') !== -1) {
      const formArea = document.getElementById('menu-link');
      if(formArea) {
        formArea.scrollIntoView();
      }
      this.isCompany = true;
    } else {
      // const companySectionArea = document.getElementById('service');
      // if(companySectionArea) {
      //   companySectionArea.scrollIntoView();
      // }
      this.isCompany = false;
    }
    if(this.router.url.indexOf('cv') !== -1) {
      const formArea = document.getElementById('menu-link');
      if(formArea) {
        formArea.scrollIntoView();
      }
    }
  }

  changeCustomerType(type) {
    if(type === 'company') {
      this.isCompany = true;
    } else {
      this.isCompany = false;
    }
    const formArea = document.getElementById('menu-link');
    if(formArea) {
      formArea.scrollIntoView();
    }
  }

  async nextStep() {
    if(this.step === 3 && this.canSendCurriculum()) {
      this.step++;
      await this.sendCurriculum();
    } else if(this.step === 2 && this.canMoveToThirdStep()) {
      this.step++;
    } else if(this.step === 1 && this.canMoveToSecondStep()) {
      this.step++;
    } else {
      // this.notificationService.notification$.next({
      //   type: 'warning',
      //   message: 'Preencha todas as informações corretamente para prosseguir!'
      // });
    }
    const formArea = document.getElementById('send-form');
    if(formArea) {
      formArea.scrollIntoView();
    }
  }

  isCpfValid() {
    let cpf = this.employeeData.cpf.toString();
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
  }

  isCnpjValid() {
    let cnpj = this.companyData.cnpj;
    cnpj = cnpj.replace(/[^\d]+/g,'');
    if(cnpj === '' || cnpj.length !== 14) {
      return false;
    }
    // Elimina CNPJs invalidos conhecidos
    if (cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999') {
      return false;
    }
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
      return false;
    }
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
      return false;
    }
    return true;
  }

  canMoveToSecondStep() {
    if(!this.employeeData.segment) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Selecione um segmento para prosseguir!'
      });
    }
    return this.employeeData.segment !== null;
  }

  canMoveToThirdStep() {
    let canMove = true;
    if(!this.employeeData.name) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o seu nome completo para prosseguir!'
      });
      canMove = false;
      return false;
    }
    if(!this.employeeData.cpf) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o seu cpf para prosseguir!'
      });
      canMove = false;
      return false;
    }
    if(!this.isCpfValid()) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'CPF Inválido, preencha um cpf válido para prosseguir!'
      });
      canMove = false;
      return false;
    }
    if(!this.employeeData.city) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha a sua cidade para prosseguir!'
      });
      canMove = false;
      return false;
    }
    if(!this.employeeData.state) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o seu estado para prosseguir!'
      });
      canMove = false;
      return false;
    }
    if(!this.employeeData.position) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o campo de cargo para prosseguir!'
      });
      return false;
    }
    if(!this.employeeData.minSalary) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o campo salário mínimo para prosseguir!'
      });
      canMove = false;
      return false;
    }
    if(!this.employeeData.idealSalary) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o campo salário ideal para prosseguir!'
      });
      canMove = false;
      return false;
    }
    if(!this.employeeData.email) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o campo de e-mail para prosseguir!'
      });
      canMove = false;
      return false;
    }
    if(!this.employeeData.cellPhone) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o campo de celular para prosseguir!'
      });
      canMove = false;
      return false;
    }
    return canMove;
  }

  canSendCurriculum() {
    if(this.isShopping && !this.employeeData.firstShopping) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o shopping de preferência para prosseguir!'
      });
      return false;
    }
    if(!this.employeeData.storeTypePreference) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Selecione a sua preferência para prosseguir!'
      });
      return false;
    }
    if(!this.files || this.files.size == 0) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Faça o upload do seu currículo no formato .PDF ou .DOCX para prosseguir!'
      });
    }
    if(this.isShopping) {
      return this.employeeData.firstShopping !== null && this.files && this.files.size > 0 &&
        this.canMoveToSecondStep() && this.canMoveToThirdStep();
    }
    return this.files && this.files.size > 0 &&
      this.canMoveToSecondStep() && this.canMoveToThirdStep();
  }

  changeEmployeeSegment(segment) {
    this.isOtherSegment = false;
    this.employeeData.segment = segment;
  }

  enableInputSegment() {
    this.isOtherSegment = true;
    this.employeeData.segment = null;
  }

  isCompanyDataCompleted() {
    let canSend = true;
    if(!this.companyData.companyName) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o nome da empresa!'
      });
      canSend = false;
      return canSend;
    }
    if(!this.companyData.contactName) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o nome do responsável!'
      });
      canSend = false;
      return canSend;
    }
    if(!this.companyData.contactPosition) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o cargo do responsável!'
      });
      canSend = false;
      return canSend;
    }
    if(!this.companyData.contact) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o telefone do responsável!'
      });
      canSend = false;
      return canSend;
    }
    if(!this.companyData.email) {
      this.notificationService.notification$.next({
        type: 'warning',
        message: 'Preencha o e-mail do responsável!'
      });
      canSend = false;
      return canSend;
    }
    return canSend;
  }

  selectJobPosition(event) {
    this.employeeData.position = event.target.value;
  }

  selectSalaryMin(event) {
    this.employeeData.minSalary = event.target.value;
  }

  selectSalaryIdeal(event) {
    this.employeeData.idealSalary = event.target.value;
  }

  selectState(event) {
    this.employeeData.state = event.target.value;
  }

  async sendCurriculum() {
    if (this.canSendCurriculum()) {
      const bucketFileKey = await this.curriculumService.sendCurriculumFile(this.files);
      this.employeeData.curriculum = bucketFileKey.data;
      this.employeeData.createdAt = new Date();
      this.employeeData.city = this.employeeData.city.toLocaleLowerCase();
      this.employeeData.city = this.employeeData.city.charAt(0).toUpperCase() + this.employeeData.city.slice(1);
      if(this.employeeData.cellPhone.substr(0, 2) !== '55') {
        this.employeeData.cellPhone = '55' + this.employeeData.cellPhone;
      }
      const result = await this.curriculumService.sendEmployeeData({
        cv: this.employeeData
      });
      this.mailService.sendBethKalanCanidateEmail({ name: this.employeeData.name, email: this.employeeData.email });
      this.mailService.sendCandidateEmail({ name: this.employeeData.name, email: this.employeeData.email });
    }
  }

  async sendCompanyContact() {
    if (this.isCompanyDataCompleted()) {
      this.companyDataSent = true;
      const result = await this.contactService.sendCompanyContact({
        companyData: this.companyData
      });
      console.log(result);
      this.mailService.sendBethKalanCompanyEmail({ name: this.companyData.contactName, email: this.companyData.email });
      this.mailService.sendCompanyEmail({ name: this.companyData.contactName, email: this.companyData.email });
    }
    // else {
    //   this.notificationService.notification$.next({
    //     type: 'warning',
    //     message: 'Preencha todas as informações corretamente para prosseguir!'
    //   });
    // }
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  removeFile(file: File) {
    this.file.nativeElement.value = '';
    this.files = new Set();
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  changeEmployeePreference(preferenceType) {
    this.employeeData.storeTypePreference = preferenceType;
    if(preferenceType === 'Show room') {
      this.isShowRoom = true;
      this.isStreetStore = false;
      this.isShopping = false;
    } else if(preferenceType === 'Loja de rua') {
      this.isShowRoom = false;
      this.isStreetStore = true;
      this.isShopping = false;
    } else if(preferenceType === 'Shopping') {
      this.isShowRoom = false;
      this.isStreetStore = false;
      this.isShopping = true;
    }
  }
}
