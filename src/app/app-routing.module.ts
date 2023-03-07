import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', 
    component: AdminComponent, 
    canActivate:[AuthGuard], 
    data:{roles:['ROLE_ADMIN']} 
  },
  { path: 'user', 
    component: UserComponent ,  
    canActivate:[AuthGuard], 
    data:{roles:['ROLE_USER']} 
  },
  { path: 'provider', 
    component: ProviderComponent ,  
    canActivate:[AuthGuard], 
    data:{roles:['ROLE_SERVICE_PROVIDER']} 
  },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'user-list', component: ListUsersComponent },
  { path: 'service-list', component: ListServicesComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
