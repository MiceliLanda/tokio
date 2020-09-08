import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-remember-password',
  templateUrl: './remember-password.component.html',
  styleUrls: ['./remember-password.component.css']
})


export class RememberPasswordComponent {
  SendEmail = new FormControl('');
  constructor(private authSvc: AuthService, private router: Router) {}

  showErrorAlert(error) {
    Swal.fire('Error!', error, 'error');
  }

  showSuccessAlert() {
    Swal.fire('Excellent!', 'Send Email', 'success')
  }

  async rememberPassword() {
    try {
      const email = this.SendEmail.value;
      await this.authSvc.resetPassword(email);
      this.showSuccessAlert();
      this.router.navigate(['/login']);
    } catch (error) {
      this.showErrorAlert(error.toString())
    }
  }
}

  

  

