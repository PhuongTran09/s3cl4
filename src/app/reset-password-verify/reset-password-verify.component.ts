import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';

@Component({
  selector: 'app-reset-password-verify',
  standalone: true,
  imports: [RouterLink, NgIf, TranslatePipe],
  templateUrl: './reset-password-verify.component.html',
  styleUrl: './reset-password-verify.component.css'
})
export class ResetPasswordVerifyComponent {
  newPassword = '';
  confirmPassword = '';
  showNewPasswordError = false;
  showConfirmPasswordError = false;

  onNewPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.newPassword = value;
    this.showNewPasswordError = value.length > 0 && value.length < 12;
  }

  onConfirmPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.confirmPassword = value;
    this.showConfirmPasswordError = value.length > 0 && value.length < 12;
  }
}

