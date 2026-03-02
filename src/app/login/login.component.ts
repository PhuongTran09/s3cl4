import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly demoEmail = 'demo@s3ls4.com';
  private readonly demoPassword = 'Demo@123456';

  email = '';
  password = '';
  loginErrorKey = '';

  constructor(private readonly router: Router) {}

  onEmailInput(event: Event): void {
    this.email = (event.target as HTMLInputElement).value.trim();
    this.loginErrorKey = '';
  }

  onPasswordInput(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
    this.loginErrorKey = '';
  }

  login(): void {
    const isValidEmail = this.email.toLowerCase() === this.demoEmail;
    const isValidPassword = this.password === this.demoPassword;

    if (isValidEmail && isValidPassword) {
      this.loginErrorKey = '';
      void this.router.navigate(['/home']);
      return;
    }

    this.loginErrorKey = 'login.invalidCredentials';
  }
}

