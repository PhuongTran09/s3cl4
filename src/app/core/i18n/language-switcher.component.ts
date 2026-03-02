import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { I18nService } from './i18n.service';
import { ThemeService } from '../services/theme.service';
import { TranslatePipe } from './translate.pipe';
import { AppLanguage } from './translations';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [NgIf, NgFor, TranslatePipe],
  template: `
    <div class="relative flex min-w-max items-center gap-2" aria-label="Language switcher">
      <button
        type="button"
        class="theme-switch-btn"
        [class.theme-switch-btn-off]="!themeService.isLightTheme()"
        [class.theme-switch-btn-on]="themeService.isLightTheme()"
        (click)="toggleTheme()"
      >
        <span class="theme-switch-track" [class.theme-switch-track-on]="themeService.isLightTheme()"></span>
        <span class="theme-switch-thumb" [class.theme-switch-thumb-on]="themeService.isLightTheme()">
          <img
            class="theme-switch-icon"
            [src]="themeService.isLightTheme() ? '/assets/icons/on.svg' : '/assets/icons/off.svg'"
            alt=""
          />
        </span>
      </button>

      <div class="relative">
        <button
          type="button"
          class="lang-switch-btn flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-sky-400/35 bg-slate-950/70 px-2 sm:px-2.5 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-400/55 hover:bg-slate-950/80"
          (click)="toggleLanguageMenu($event)"
        >
          <img class="lang-icon h-4.5 w-4.5" src="/assets/icons/language.svg" [alt]="'common.lang' | t" />
          <img
            class="h-3.5 w-5 rounded object-cover"
            [src]="activeFlag"
            [alt]="i18nService.language()"
          />
        </button>

        <span
          *ngIf="isLanguageMenuOpen"
          class="lang-menu-arrow pointer-events-none absolute right-4 top-[calc(100%+3px)] z-1001 h-2.5 w-2.5 rotate-45 border-l border-t border-sky-400/35 bg-slate-950/90"
        ></span>

        <ul
          class="lang-menu absolute right-0 top-[calc(100%+7px)] z-1000 m-0 min-w-34 list-none rounded-xl border border-sky-400/35 bg-slate-950/90 p-1.5 sm:min-w-37.5"
          *ngIf="isLanguageMenuOpen"
        >
          <li *ngFor="let option of languageOptions">
            <button
              type="button"
              class="lang-menu-item flex w-full cursor-pointer items-center gap-2 rounded-lg bg-transparent px-2 py-1.5 text-left text-xs font-semibold text-sky-100/95 transition hover:bg-sky-500/20 sm:text-sm"
              (click)="setLanguage(option.code)"
            >
              <img
                class="h-3.5 w-5 rounded object-cover"
                [src]="option.flag"
                [alt]="option.code"
              />
              <span>{{ option.labelKey | t }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class LanguageSwitcherComponent {
  isLanguageMenuOpen = false;
  readonly languageOptions: ReadonlyArray<{ code: AppLanguage; labelKey: string; flag: string }> = [
    { code: 'vi', labelKey: 'common.langVi', flag: '/assets/flags/vi.svg' },
    { code: 'en', labelKey: 'common.langEn', flag: '/assets/flags/en.svg' }
  ];

  constructor(
    public readonly i18nService: I18nService,
    public readonly themeService: ThemeService
  ) {}

  setLanguage(language: AppLanguage): void {
    this.i18nService.setLanguage(language);
    this.isLanguageMenuOpen = false;
  }

  toggleLanguageMenu(event: Event): void {
    event.stopPropagation();
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get activeFlag(): string {
    const activeLanguage = this.i18nService.language();
    const found = this.languageOptions.find((option) => option.code === activeLanguage);
    return found?.flag ?? this.languageOptions[1].flag;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('app-language-switcher')) {
      this.isLanguageMenuOpen = false;
    }
  }
}

