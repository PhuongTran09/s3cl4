import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageSwitcherComponent } from '../core/i18n/language-switcher.component';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { RandomHorseDirective } from '../shared/random-horse.directive';
import { ScrollRevealDirective } from '../shared/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcherComponent, RandomHorseDirective, ScrollRevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isProductMenuOpen = false;
  currentScreen = 1;
  private readonly totalScreens = 2;
  screenTransitionProgress = 0;
  isMobileView = false;

  readonly productMenuCategories: ReadonlyArray<{ name: string; items: ReadonlyArray<string> }> = [
    { name: 'Monitoring', items: ['Sky Monitor Pro', 'Live Alerts', 'Performance Trends'] },
    { name: 'API', items: ['Blue API Gateway', 'Token Manager', 'Rate Limit Guard'] },
    { name: 'Storage', items: ['Black Vault Storage', 'Snapshot Restore', 'Backup Sync'] }
  ];

  readonly productPageSize = 3;
  readonly newsPageSize = 2;
  productPage = 1;
  newsPage = 1;

  readonly products: ReadonlyArray<{ name: string; price: string; description: string }> = [
    {
      name: 'Sky Monitor Pro',
      price: '$49/mo',
      description: 'Real-time monitoring dashboard with alerting and trend analysis.'
    },
    {
      name: 'Blue API Gateway',
      price: '$99/mo',
      description: 'Secure gateway for rate limiting, auth policies, and traffic insights.'
    },
    {
      name: 'Black Vault Storage',
      price: '$29/mo',
      description: 'Encrypted cloud storage with backup snapshots and version restore.'
    }
  ];

  readonly newsItems: ReadonlyArray<{ title: string; time: string; summary: string }> = [
    {
      title: 'System maintenance completed',
      time: '10 minutes ago',
      summary: 'Core services were upgraded and all modules are back to normal.'
    },
    {
      title: 'New dashboard widgets available',
      time: '1 hour ago',
      summary: 'You can now pin quick stats cards directly to your home screen.'
    },
    {
      title: 'Security reminder',
      time: 'Today',
      summary: 'Please enable two-factor authentication for better account protection.'
    },
    {
      title: 'API response improvements',
      time: 'Yesterday',
      summary: 'Average response time dropped by 18% after the latest optimization.'
    }
  ];

  constructor() {
    this.updateViewportMode();
  }

  get totalProductPages(): number {
    return Math.max(1, Math.ceil(this.products.length / this.productPageSize));
  }

  get totalNewsPages(): number {
    return Math.max(1, Math.ceil(this.newsItems.length / this.newsPageSize));
  }

  get pagedProducts(): ReadonlyArray<{ name: string; price: string; description: string }> {
    const start = (this.productPage - 1) * this.productPageSize;
    return this.products.slice(start, start + this.productPageSize);
  }

  get pagedNewsItems(): ReadonlyArray<{ title: string; time: string; summary: string }> {
    const start = (this.newsPage - 1) * this.newsPageSize;
    return this.newsItems.slice(start, start + this.newsPageSize);
  }

  previousProductPage(): void {
    if (this.productPage > 1) {
      this.productPage -= 1;
    }
  }

  nextProductPage(): void {
    if (this.productPage < this.totalProductPages) {
      this.productPage += 1;
    }
  }

  previousNewsPage(): void {
    if (this.newsPage > 1) {
      this.newsPage -= 1;
    }
  }

  nextNewsPage(): void {
    if (this.newsPage < this.totalNewsPages) {
      this.newsPage += 1;
    }
  }

  toggleProductMenu(event: Event): void {
    event.stopPropagation();
    this.isProductMenuOpen = !this.isProductMenuOpen;
  }

  closeProductMenu(): void {
    this.isProductMenuOpen = false;
  }

  stopMenuPropagation(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.isProductMenuOpen = false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateViewportMode();
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const viewHeight = Math.max(window.innerHeight, 1);
    const screenIndex = Math.round(scrollY / viewHeight) + 1;
    this.screenTransitionProgress = Math.min(1, Math.max(0, scrollY / viewHeight));
    this.currentScreen = Math.min(this.totalScreens, Math.max(1, screenIndex));
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateViewportMode();
  }

  get topSectionOpacity(): number {
    if (this.isMobileView) {
      return 1;
    }
    return Math.max(0, 1 - this.screenTransitionProgress);
  }

  get topBannerTransform(): string {
    if (this.isMobileView) {
      return 'translateX(0px) translateY(0px) scale(1)';
    }
    const x = -220 * this.screenTransitionProgress;
    const y = -40 * this.screenTransitionProgress;
    const scale = 1 - (0.08 * this.screenTransitionProgress);
    return `translateX(${x}px) translateY(${y}px) scale(${scale})`;
  }

  get topSectionBlur(): string {
    if (this.isMobileView) {
      return 'blur(0px)';
    }
    return `blur(${4 * this.screenTransitionProgress}px)`;
  }

  getCardOpacity(): number {
    if (this.isMobileView) {
      return 1;
    }
    return Math.max(0, 1 - this.screenTransitionProgress * 1.05);
  }

  getCardBlur(): string {
    if (this.isMobileView) {
      return 'blur(0px)';
    }
    return `blur(${3.2 * this.screenTransitionProgress}px)`;
  }

  getCardTransform(direction: 1 | -1, strength = 130): string {
    if (this.isMobileView) {
      return 'translateX(0px) translateY(0px) scale(1)';
    }
    const x = direction * strength * this.screenTransitionProgress;
    const y = -24 * this.screenTransitionProgress;
    const scale = 1 - (0.045 * this.screenTransitionProgress);
    return `translateX(${x}px) translateY(${y}px) scale(${scale})`;
  }

  private updateViewportMode(): void {
    this.isMobileView = window.innerWidth < 640;
  }

}

