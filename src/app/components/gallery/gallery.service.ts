import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth.service';

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

  load(): Observable<Gallery> {
    const url = `${this.API}/gallery`;
    const token = this.authService.getToken();

    return this.http.get<Gallery>(url, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }

  favorite(imageId: number, action: string): Observable<{}> {
    const url = `${this.API}/gallery/image/${imageId}/favorite/${action}`;
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);

    return this.http.patch(url, {}, { headers });
  }
}
