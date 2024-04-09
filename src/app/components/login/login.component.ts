import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../auth.service';
import getErrorMessagesFromFormGroup from '../../utils/getErrorMessagesFromFormGroup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loading = false;

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);

      return;
    }

    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  login() {
    const fields = ['email', 'password'];
    const error = getErrorMessagesFromFormGroup(fields, this.form);

    if (error) {
      Swal.fire({
        icon: 'error',
        text: error
      });

      return;
    }

    this.loading = true;

    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;

        this.router.navigate(['/gallery']);
      },
      error: err => {
        this.loading = false;

        console.error(err);

        Swal.fire({
          text: err.error?.message ?? 'Um erro ocorreu no login!',
          icon: 'error'
        });
      }
    });
  }
}
