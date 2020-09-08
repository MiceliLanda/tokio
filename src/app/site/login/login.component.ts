import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/site/user/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authSv: AuthService,private router: Router){ }

  showErrorAlert(error) {
    Swal.fire('Error!', error, 'error');
  }

  async onLogin() {
    const { email, password, } = this.loginForm.value;
    try {
      const user = await this.authSv.login(email, password);
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      this.showErrorAlert(error.toString())
    }
  }

  private checkUserIsVerified(user: User) {
    if (user.email) {
      this.router.navigate(['/home']);
      console.log("verificado");
    } else if (user) {
      this.router.navigate(['/remember-password']);
      console.log("contraseña no valida");
      
    } else {
      this.router.navigate(['/register']);
    }
  }


  async onGoogleLogin() {
    try {
      const user = await this.authSv.loginGoogle();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      this.showErrorAlert(error.toString());
    }
  }

} //login



