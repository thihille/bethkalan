import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NotificationComponent, NotificationContainerComponent } from './notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { SendCvComponent } from './send-cv/send-cv.component';
import { JobsComponent } from './jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    NotificationComponent,
    NotificationContainerComponent,
    JobDescriptionComponent,
    SendCvComponent,
    JobsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  providers: [],
  entryComponents: [
    NotificationContainerComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
