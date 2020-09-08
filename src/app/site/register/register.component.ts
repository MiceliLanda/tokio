import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validator';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  

  constructor(private authSv: AuthService, private fb: FormBuilder, private router: Router) {
    this.registerForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    }) 
  }


  get f(){
    return this.registerForm.controls;
  }

  onRegister(registerData){   

      this.authSv.register(registerData.email, registerData.password);   
  }

}

