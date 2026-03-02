import { Component, HostListener } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageSwitcherComponent } from '../core/i18n/language-switcher.component';
import { TranslatePipe } from '../core/i18n/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isProductMenuOpen = false;

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
}

