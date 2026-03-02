import { Injectable, signal } from '@angular/core';
import { AppLanguage, TRANSLATIONS } from './translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly storageKey = 'app_language';
  readonly language = signal<AppLanguage>(this.getInitialLanguage());

  setLanguage(language: AppLanguage): void {
    this.language.set(language);
    localStorage.setItem(this.storageKey, language);
  }

  t(key: string): string {
    const currentLanguage = this.language();
    return TRANSLATIONS[currentLanguage][key] ?? TRANSLATIONS.en[key] ?? key;
  }

  private getInitialLanguage(): AppLanguage {
    const savedLanguage = localStorage.getItem(this.storageKey);
    if (savedLanguage === 'vi' || savedLanguage === 'en') {
      return savedLanguage;
    }

    return 'en';
  }
}
