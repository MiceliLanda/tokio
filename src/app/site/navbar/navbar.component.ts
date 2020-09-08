import { User } from '../user/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent{
  public user$: Observable<User> = this.authSv.afAuth.user;

  constructor(public authSv: AuthService, private router: Router) { }

  showErrorAlert(error) {
    Swal.fire('Error!', error, 'error');
  }

  async onLogout() {
    try {
      await this.authSv.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      this.showErrorAlert(error.toString())
    }
  }


}
