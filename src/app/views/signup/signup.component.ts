import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { SignupService } from './signup.service';
import getErrorMessagesFromFormGroup from 'src/app/utils/getErrorMessagesFromFormGroup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loading = false;
  form!: FormGroup;

  constructor(
    private signupService: SignupService,
    private router: Router,
    private fromBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  signUp(): void {
    if (!this.form.valid) {
      const fields = ['email', 'password', 'name', 'passwordConfirmation'];
      const error = getErrorMessagesFromFormGroup(fields, this.form);

      Swal.fire({
        icon: 'error',
        text: error ?? 'Um erro ocorreu no login'
      });

      return;
    }

    this.signupService.signUp(this.form.value).subscribe({
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
