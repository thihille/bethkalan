import { Component } from '@angular/core';
import { NotificationService } from './services/notification/notification.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationContainerComponent } from './notification/notification.component';
import { Router, NavigationEnd } from '@angular/router';
declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EquipesLojas';
  durationInSeconds = 5;

  constructor(
    public router: Router,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,) {

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
      // Notification Service configuration
      this.notificationService.notification$.subscribe((data) => {
        const snackBarConfig = new MatSnackBarConfig();
        snackBarConfig.data = {
          type: data.type,
          message: data.message
        };
        snackBarConfig.duration = 5000;
        snackBarConfig.verticalPosition = 'top';
        snackBarConfig.horizontalPosition = 'end';
        switch(data.type) {
          case 'success': snackBarConfig.panelClass = 'app-notification-success'; break;
          case 'error': snackBarConfig.panelClass = 'app-notification-error'; break;
          default: snackBarConfig.panelClass = 'app-notification-warning';
        }
        this.snackBar.openFromComponent(NotificationContainerComponent, snackBarConfig);
      });
  }
}
