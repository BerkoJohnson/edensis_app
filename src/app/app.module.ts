import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ValidationComponent } from './validation/validation.component';
import { VotingCenterComponent } from './voting-center/voting-center.component';
import { VotingResultsComponent } from './voting-results/voting-results.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { AppService } from './services/app.service';
import { ElectionService } from './services/election.service';
import { PositionService } from './services/position.service';
import { HomeComponent } from './home/home.component';
import { UiModule } from './ui/ui.module';
import { JwtInterceptor } from './interceptors/jwt-interceptors';
import { ErrorInterceptor } from './interceptors/error-interceptors';
import { AuthInterceptor } from './interceptors/auth-interceptors';
import { ElectionResolver } from './resolvers/elections.resolver';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ValidationComponent,
    VotingCenterComponent,
    VotingResultsComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    ElectionService,
    PositionService,
    AppService,
    AuthService,
    ElectionResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
