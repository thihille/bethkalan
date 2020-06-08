import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService) { }

  async getJob(id) {
    try {
      const result = await this.http.get(environment.equipesDeLojaApi + 'equipedeloja/vaga/' + id).toPromise();
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllActiveJobs() {
    try {
      const result = await this.http.get(environment.equipesDeLojaApi + 'equipedeloja/vagas/').toPromise();
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
