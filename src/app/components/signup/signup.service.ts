import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type SignupParams = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type SignUpResponse = {
  id: number;
  email: string;
  name: string;
};

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private readonly API = 'http://localhost:3200'

  constructor(private http: HttpClient) { }

  signUp(data: SignupParams): Observable<SignUpResponse> {
    const url = `${this.API}/user`;

    return this.http.post<SignUpResponse>(url, data);
  }
}
