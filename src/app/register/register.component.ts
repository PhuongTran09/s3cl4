import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../core/i18n/translate.pipe';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NgIf, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  password = '';
  showPasswordError = false;

  onPasswordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.password = value;
    this.showPasswordError = value.length > 0 && value.length < 12;
  }
}

