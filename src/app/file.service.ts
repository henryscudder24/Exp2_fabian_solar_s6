import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private files: any[] = [];

  constructor(private storage: Storage) {
    this.loadFiles();
  }

  private async loadFiles() {
    const storedFiles = await this.storage.get('files');
    if (storedFiles) {
      this.files = storedFiles;
    }
  }

  async addFile(file: any) {
    this.files.push(file);
    await this.storage.set('files', this.files);
  }

  getFiles() {
    return this.files;
  }

  async getStoredFiles() {
    await this.loadFiles();
    return this.files;
  }

  getFilteredFiles() {
    // agregar logica de filtro por usuario logeado * revisar
    return this.files;
  }
}
