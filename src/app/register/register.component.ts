import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LanguageSwitcherComponent } from '../core/i18n/language-switcher.component';
import { TranslatePipe } from '../core/i18n/translate.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NgIf, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  password = '';
  showPasswordError = false;

  constructor(private readonly router: Router) {}

  onPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.password = value;
    this.showPasswordError = value.length > 0 && value.length < 12;
  }

  goToLogin(event: Event): void {
    event.preventDefault();
    void this.router.navigate(['/login']);
  }
}

