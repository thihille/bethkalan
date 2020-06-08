import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs = [];

  constructor(
    private jobService: JobService,
    private router: Router
  ) { }

  async ngOnInit() {
    const result = await this.jobService.getAllActiveJobs();
    this.jobs = result && result['data'] ? result['data'] : [];
  }

  openJobPositionPage(jobPositionId) {
    this.router.navigate(['/vaga/' + jobPositionId]);
  }

}
