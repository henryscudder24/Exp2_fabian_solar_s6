import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.getUser(email, password);
    if (user) {
      await this.setItem('isLoggedIn', true);
      await this.setItem('email', email);
      return true;
    }
    return false;
  }

  async logout() {
    await this.setItem('isLoggedIn', false);
    await this.router.navigate(['/login']);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.getItem('isLoggedIn');
  }

  private async getUser(email: string, password: string): Promise<any> {
    const users: Array<{ email: string, password: string }> = await this.getItem('users') || [];
    return users.find(user => user.email === email && user.password === password);
  }

  private async setItem(key: string, value: any): Promise<void> {
    if (this.isWeb()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      await this.storage.set(key, value);
    }
  }

  private async getItem(key: string): Promise<any> {
    if (this.isWeb()) {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } else {
      return await this.storage.get(key);
    }
  }

  private isWeb(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  }
}
