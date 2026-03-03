import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    const element = this.elRef.nativeElement;
    this.renderer.addClass(element, 'scroll-reveal');

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.renderer.addClass(element, 'scroll-reveal-visible');
            }
          }
        },
        {
          threshold: 0.18,
          rootMargin: '0px 0px -10% 0px'
        }
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}

