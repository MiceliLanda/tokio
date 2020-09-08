import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RememberPasswordComponent } from './remember-password/remember-password.component';
/* import { AngularFireAuthModule } from '@angular/fire/auth' */
@NgModule({
  declarations: [SiteComponent, HomeComponent, NavbarComponent, LoginComponent, RegisterComponent, RememberPasswordComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    ReactiveFormsModule,
 /*    AngularFireAuthModule */
  ]
})
export class SiteModule { }
