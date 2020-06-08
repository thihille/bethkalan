import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService) { }

  async sendEmployeeData(cv) {
    try {
      const result = await this.http.post(environment.equipesDeLojaApi + 'equipedeloja/savecv', cv).toPromise();
      return result;
    } catch (e) {
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro ao salvar registro! ' + e.message
      });
    }
  }

  async sendCurriculumFile(files) {
    try {
      // this.loader.show();
      const results = [];
      for(let file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const result = await this.http.post(environment.equipesDeLojaApi + 'uploadCurriculum', formData).toPromise();
        results.push(result);
      }
      // this.loader.hide();
      return results[0];
    } catch (e) {
      // this.loader.hide();
      this.notificationService.notification$.next({
        type: 'error',
        message: 'Erro no upload do csv!' + e.message
      });
    }
  }
}
