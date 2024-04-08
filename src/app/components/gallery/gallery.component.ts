import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { GalleryService } from './gallery.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

type Gallery = {
  id: number;
  image: string;
  owner: string;
  like: boolean;
  love: boolean;
  downloads: number;
}[];

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  gallery = [] as Gallery;
  curentFilterApplied = '';

  constructor(
    private galleryService: GalleryService,
    private router: Router,
    private authSerive: AuthService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(filter: string = '') {
    this.curentFilterApplied = filter;

    this.galleryService.load(filter).subscribe((gallery) => {
      this.gallery = gallery;
    });
  }

  favorite(action: string, imageId: number): void {
    this.galleryService.favorite(imageId, action).subscribe(() => {
      const index = this.gallery.findIndex(img => img.id === imageId);
      const isFavorited = !this.gallery[index][action];

      this.gallery[index][action] = isFavorited;

      if (!isFavorited && this.curentFilterApplied) {
        this.gallery.splice(index, 1);
      }
    });
  }

  deleteImage(imageId: number) {
    Swal.fire({
      icon: 'warning',
      text: 'Tem certeza que deseja deletar ?',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((response) => {
      if (!response.isConfirmed) {
        return;
      }

      this.galleryService.deleteImage(imageId).subscribe(() => {
        this.load(this.curentFilterApplied);
      })
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;

    if (file) {
      this.galleryService.addImage(file).subscribe(() => {
        this.load(this.curentFilterApplied);
      });
    }
  }

  submitImage() {
    document.getElementById('submit_inpt')?.click();
  }

  logout() {
    this.authSerive.logout();

    this.router.navigate(['/login']);
  }
}
