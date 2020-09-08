import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './site/login/login.component';
import { RegisterComponent } from './site/register/register.component';
import { HomeComponent } from './site/home/home.component';
import { RememberPasswordComponent } from './site/remember-password/remember-password.component';

const routes: Routes = [{
  path: 'site', loadChildren: () => import('./site/site.module').then(m => m.SiteModule)},
  {path: 'hosts', loadChildren: () => import('./hosts/hosts.module').then(m => m.HostsModule)
  },{path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'remember-password', component: RememberPasswordComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
