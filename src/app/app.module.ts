import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
import { ProviderComponent } from './components/provider/provider.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ServicesComponent } from './components/services/services.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddServicesComponent } from './components/add-services/add-services.component';
import { AddRatingsComponent } from './components/add-ratings/add-ratings.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { ListRatingsComponent } from './components/list-ratings/list-ratings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    ProviderComponent,
    RatingsComponent,
    FooterComponent,
    ProfileComponent,
    ServicesComponent,
    AddUserComponent,
    AddServicesComponent,
    AddRatingsComponent,
    ListUsersComponent,
    ListServicesComponent,
    ListRatingsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
