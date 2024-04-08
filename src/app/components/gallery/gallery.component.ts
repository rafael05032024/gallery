import { Component, OnInit } from '@angular/core';

import { GalleryService } from './gallery.service';

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
  curentFilter = 'get-all';

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.galleryService.load().subscribe({
      next: response => {
        this.gallery = response;
      }
    });
  }

  changeFilter(event: any) {
    console.log(event);
  }

  favorite(action: string, imageId: number) {
    this.galleryService.favorite(imageId, action).subscribe(() => {
      const index = this.gallery.findIndex(img => img.id === imageId);

      if (action === 'like') {
        this.gallery[index].like = !this.gallery[index].like;

        return;
      }

      this.gallery[index].love = !this.gallery[index].love;
    });
  }
}
