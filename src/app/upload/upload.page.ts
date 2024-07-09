import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  selectedFile: File | null = null;

  constructor(private location: Location) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      // Aquí puedes añadir la lógica de subida de archivos
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }

  goBack() {
    this.location.back();
  }
}
