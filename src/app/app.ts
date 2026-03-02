import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/i18n/i18n.service';
import { TranslatePipe } from './core/i18n/translate.pipe';
import { AppLanguage } from './core/i18n/translations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, NgIf, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLanguageMenuOpen = false;
  readonly languageOptions: ReadonlyArray<{ code: AppLanguage; labelKey: string; flag: string }> = [
    { code: 'vi', labelKey: 'common.langVi', flag: '/assets/flags/vi.svg' },
    { code: 'en', labelKey: 'common.langEn', flag: '/assets/flags/en.svg' }
  ];

  constructor(public readonly i18nService: I18nService) {}

  setLanguage(language: AppLanguage): void {
    this.i18nService.setLanguage(language);
    this.isLanguageMenuOpen = false;
  }

  toggleLanguageMenu(event: Event): void {
    event.stopPropagation();
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  get activeFlag(): string {
    const activeLanguage = this.i18nService.language();
    const found = this.languageOptions.find((option) => option.code === activeLanguage);
    return found?.flag ?? this.languageOptions[1].flag;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.lang-switcher')) {
      this.isLanguageMenuOpen = false;
    }
  }
}
