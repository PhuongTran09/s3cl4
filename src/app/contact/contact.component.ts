import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageSwitcherComponent } from '../core/i18n/language-switcher.component';
import { TranslatePipe } from '../core/i18n/translate.pipe';
import { RandomHorseDirective } from '../shared/random-horse.directive';
import { ScrollRevealDirective } from '../shared/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcherComponent, RandomHorseDirective, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  currentScreen = 1;
  private readonly totalScreens = 2;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const viewHeight = Math.max(window.innerHeight, 1);
    const screenIndex = Math.round(scrollY / viewHeight) + 1;
    this.currentScreen = Math.min(this.totalScreens, Math.max(1, screenIndex));
  }
}

