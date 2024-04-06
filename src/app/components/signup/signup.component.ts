import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  loading = false;
  passwordConfirmation = '';

  constructor(
    private signupService: SignupService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.signupService.signUp({
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          text: 'Conta criada com sucesso!'
        });

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);

        Swal.fire({
          icon: 'error',
          text: 'Um erro ocorreu ao tentar realizar o cadastro :('
        });
      }
    });
  }
}
