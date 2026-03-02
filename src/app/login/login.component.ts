import { Component } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LanguageSwitcherComponent } from '../core/i18n/language-switcher.component';
import { TranslatePipe } from '../core/i18n/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly demoEmail = 'demo@s3ls4.com';
  private readonly demoPassword = 'Demo@123456';

  mode: 'login' | 'register' = 'login';
  email = '';
  password = '';
  loginErrorKey = '';
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  showRegisterPasswordError = false;
  switchAnimation: 'to-login' | 'to-register' | '' = '';
  private switchAnimationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) {
    this.mode = this.route.snapshot.routeConfig?.path === 'register' ? 'register' : 'login';
  }

  onEmailInput(event: Event): void {
    this.email = (event.target as HTMLInputElement).value.trim();
    this.loginErrorKey = '';
  }

  onPasswordInput(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
    this.loginErrorKey = '';
  }

  onRegisterNameInput(event: Event): void {
    this.registerName = (event.target as HTMLInputElement).value.trim();
  }

  onRegisterEmailInput(event: Event): void {
    this.registerEmail = (event.target as HTMLInputElement).value.trim();
  }

  onRegisterPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.registerPassword = value;
    this.showRegisterPasswordError = value.length > 0 && value.length < 12;
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

  register(): void {
    const hasValidPassword = this.registerPassword.length >= 12;
    this.showRegisterPasswordError = !hasValidPassword;

    if (!this.registerName || !this.registerEmail || !hasValidPassword) {
      return;
    }

    void this.router.navigate(['/home']);
  }

  switchMode(mode: 'login' | 'register'): void {
    if (this.mode === mode) {
      return;
    }

    this.switchAnimation = mode === 'register' ? 'to-register' : 'to-login';
    if (this.switchAnimationTimeoutId) {
      clearTimeout(this.switchAnimationTimeoutId);
    }
    this.switchAnimationTimeoutId = setTimeout(() => {
      this.switchAnimation = '';
      this.switchAnimationTimeoutId = null;
    }, 260);

    this.mode = mode;
    this.loginErrorKey = '';
    this.location.replaceState(mode === 'login' ? '/login' : '/register');
  }
}

