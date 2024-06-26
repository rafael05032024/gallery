import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

type Gallery = {
  id: number;
  image: string;
  owner: string;
  like: boolean;
  love: boolean;
  downloads: number;
}[];

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private readonly API = 'http://localhost:3200'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  load(filter: string = ''): Observable<Gallery> {
    const url = ['love', 'like'].includes(filter) ? `${this.API}/gallery?${filter}=true`: `${this.API}/gallery`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`);

    return this.http.get<Gallery>(url, { headers });
  }

  favorite(imageId: number, action: string): Observable<{}> {
    const url = `${this.API}/gallery/image/${imageId}/favorite/${action}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`);

    return this.http.patch(url, {}, { headers });
  }

  addImage(file: File): Observable<{}> {
    const url = `${this.API}/gallery/image`;
    const token = this.authService.getToken();
    const formData = new FormData();
    const headers = new HttpHeaders()
    .set('authorization', `Bearer ${token}`);

    formData.append('image', file, file.name);

    return this.http.post(url, formData, { headers });
  }

  deleteImage(imageId: number): Observable<{}> {
    const url =  `${this.API}/gallery/image/${imageId}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`);

    return this.http.delete(url, { headers });
  }
}
