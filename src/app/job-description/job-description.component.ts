import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job/job.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {

  jobId = null;
  jobDetails = null;
  isApplyJobEnable = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService
  ) { }

  async ngOnInit() {
    this.jobId = this.route.params && this.route.params['_value'] && this.route.params['_value']['id'] ?
      this.route.params['_value']['id'] : null;
    if(this.jobId) {
      await this.getJobDetails(this.jobId);
    }
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }

  async getJobDetails(id) {
    const result = await this.jobService.getJob(id);
    console.log(result);
    if(result && result['data']) {
      this.jobDetails = result['data'];
    }
  }

  applyToJob() {
    this.isApplyJobEnable = true;
  }
}
