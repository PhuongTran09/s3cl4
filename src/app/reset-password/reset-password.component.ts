import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, NgIf, TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email = '';
  emailErrorKey = '';

  constructor(private readonly router: Router) {}

  onEmailInput(event: Event): void {
    this.email = (event.target as HTMLInputElement).value.trim();
    this.emailErrorKey = '';
  }

  sendOtp(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email)) {
      this.emailErrorKey = 'reset.invalidEmail';
      return;
    }

    this.emailErrorKey = '';
    void this.router.navigate(['/reset-password/verify'], {
      queryParams: { email: this.email }
    });
  }
}

