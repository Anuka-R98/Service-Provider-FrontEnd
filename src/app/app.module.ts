import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
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
import { ListServicesComponent } from './components/list-services/list-services.component';
import { ListRatingsComponent } from './components/list-ratings/list-ratings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Header2Component } from './components/header2/header2.component';
import { ToastrModule } from 'ngx-toastr';
import { ListUsersComponent } from './components/list-users/list-users.component';

;


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
    ListServicesComponent,
    ListRatingsComponent,
    DashboardComponent,
    Header2Component,
    ListUsersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
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
