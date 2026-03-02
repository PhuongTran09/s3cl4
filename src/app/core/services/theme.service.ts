import { Injectable, signal } from '@angular/core';

export type AppTheme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'app_theme';
  readonly theme = signal<AppTheme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  setTheme(theme: AppTheme): void {
    this.theme.set(theme);
    localStorage.setItem(this.storageKey, theme);
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  isLightTheme(): boolean {
    return this.theme() === 'light';
  }

  private applyTheme(theme: AppTheme): void {
    const root = document.documentElement;
    root.classList.toggle('theme-light', theme === 'light');
    root.style.colorScheme = theme;
  }

  private getInitialTheme(): AppTheme {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return 'dark';
  }
}

