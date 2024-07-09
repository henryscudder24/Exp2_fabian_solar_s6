import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const isLoggedIn = await this.authService.login(email, password);
      if (isLoggedIn) {
        this.navCtrl.navigateRoot('/home');
      } else {
        alert('Credenciales incorrectas');
      }
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  espacio2() {
    this.navCtrl.navigateForward('/myspace');
  }
}
