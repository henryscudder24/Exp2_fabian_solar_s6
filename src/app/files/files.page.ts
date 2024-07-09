import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { isPlatform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

interface FileInfo {
  name: string;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {
  files: FileInfo[] = [];

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    await this.loadFiles();
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileContent = await this.readFileAsText(file);
      await this.saveFile(file.name, fileContent);
      await this.loadFiles();
    }
  }

  async readFileAsText(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  async saveFile(fileName: string, content: string) {
    if (isPlatform('hybrid')) {
      await Filesystem.writeFile({
        path: fileName,
        data: content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
    } else {
      const files = await this.storage.get('files') || [];
      files.push({ name: fileName, content });
      await this.storage.set('files', files);
    }
  }

  async loadFiles() {
    if (isPlatform('hybrid')) {
      const files = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents,
      });
      this.files = files.files.map(file => ({ name: file as unknown as string }));
    } else {
      const storedFiles = await this.storage.get('files') || [];
      this.files = storedFiles.map((file: any) => ({ name: file.name }));
    }
  }

  async shareFile(file: FileInfo) {
    console.log('Compartir archivo:', file.name);
  }

  async downloadFile(file: FileInfo) {
    if (isPlatform('hybrid')) {
      const result = await Filesystem.readFile({
        path: file.name,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      console.log('Descargar archivo:', result.data);
    } else {
      const storedFiles = await this.storage.get('files') || [];
      const fileData = storedFiles.find((storedFile: any) => storedFile.name === file.name);
      if (fileData) {
        console.log('Descargar archivo:', fileData.content);
      }
    }
  }
}
