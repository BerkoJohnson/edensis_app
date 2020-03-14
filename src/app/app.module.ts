import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ValidationComponent } from './validation/validation.component';
import { VotingCenterComponent } from './voting-center/voting-center.component';
import { VotingResultsComponent } from './voting-results/voting-results.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { AppService } from "./app.service";
import { SetupService } from './setup.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ValidationComponent,
    VotingCenterComponent,
    VotingResultsComponent,
    DashboardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SetupService, AppService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
