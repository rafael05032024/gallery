import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('passei aqui');

    if (this.authService.isAuthenticated()) {

      console.log('passei aqui!');
      this.router.navigate(['/']);
    }
  }

  login() {
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
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
