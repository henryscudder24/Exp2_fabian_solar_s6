import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FileService } from '../file.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-myspace',
  templateUrl: './myspace.page.html',
  styleUrls: ['./myspace.page.scss'],
})
export class MyspacePage implements OnInit {
  filteredFiles: any[] = [];
  userPosts: any[] = [];
  errorMessage: string = '';

  constructor(private location: Location, private fileService: FileService, private apiService: ApiService) { }

  async ngOnInit() {
    this.filteredFiles = await this.fileService.getStoredFiles();
    this.loadUserPosts(1);
  }

  loadUserPosts(userId: number) {
    this.apiService.getUserPosts(userId).subscribe(
      posts => {
        this.userPosts = posts;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  shareFile(file: any) {
    console.log('Compartir archivo:', file.name);
  }

  DownloadFile(file: any) {
    console.log('Descargar archivo:', file.name);
  }

  goBack() {
    this.location.back();
  }
}
