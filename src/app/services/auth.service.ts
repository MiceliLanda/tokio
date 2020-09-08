import { User } from 'src/app/site/user/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router :Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  showErrorAlert(error) {
    Swal.fire('Error!', error, 'error');
  }

  showSuccessAlert() {
    Swal.fire('Excellent!', 'Your Account Was Created Successfully!', 'success')
  }


  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      return user;
    } catch (error) {
           this.showErrorAlert(error.toString())       
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
      
    } catch (error) {
      this.showErrorAlert(error.toString())
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      this.showErrorAlert(error.toString())
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      this.showSuccessAlert();
      this.router.navigate(['/login']);
      return user;
    } catch (error) {
      this.showErrorAlert(error.toString())
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      this.showErrorAlert(error.toString())
    }
  }

}
