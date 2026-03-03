import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appRandomHorse]',
  standalone: true
})
export class RandomHorseDirective implements AfterViewInit, OnDestroy {
  private currentX = 0;
  private currentY = 0;
  private facing: 1 | -1 = -1;
  private isRunning = false;
  private moveTimer: ReturnType<typeof setTimeout> | null = null;
  private activeAnimation: Animation | null = null;

  constructor(
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.isRunning = true;
      this.setInitialPosition();
      this.scheduleNextMove();
    });
  }

  ngOnDestroy(): void {
    this.isRunning = false;
    if (this.moveTimer) {
      clearTimeout(this.moveTimer);
      this.moveTimer = null;
    }
    if (this.activeAnimation) {
      this.activeAnimation.cancel();
      this.activeAnimation = null;
    }
  }

  private setInitialPosition(): void {
    const host = this.elRef.nativeElement;
    const lane = host.parentElement;
    if (!lane) {
      return;
    }

    const maxX = Math.max(0, lane.clientWidth - host.offsetWidth);
    const maxY = Math.max(0, lane.clientHeight - host.offsetHeight);
    this.currentX = Math.random() * maxX;
    this.currentY = Math.random() * maxY;
    host.style.transform = `translate(${this.currentX}px, ${this.currentY}px) scaleX(1)`;
  }

  private scheduleNextMove(): void {
    if (!this.isRunning) {
      return;
    }

    const host = this.elRef.nativeElement;
    const lane = host.parentElement;
    if (!lane) {
      return;
    }

    const maxX = Math.max(0, lane.clientWidth - host.offsetWidth);
    const maxY = Math.max(0, lane.clientHeight - host.offsetHeight);

    const minDistance = 36;
    let targetX = this.currentX;
    let targetY = this.currentY;
    let distance = 0;
    let tries = 0;

    while (distance < minDistance && tries < 8) {
      targetX = Math.random() * maxX;
      targetY = Math.random() * maxY;
      distance = Math.hypot(targetX - this.currentX, targetY - this.currentY);
      tries += 1;
    }

    const deltaX = targetX - this.currentX;
    if (Math.abs(deltaX) > 8) {
      this.facing = deltaX > 0 ? -1 : 1;
    }

    // Keep near-constant speed to avoid jerky short hops.
    const pxPerSecond = 24;
    const duration = Math.max(1800, Math.min(7000, (distance / pxPerSecond) * 1000));

    this.activeAnimation?.cancel();
    this.activeAnimation = host.animate(
      [
        { transform: `translate(${this.currentX}px, ${this.currentY}px) scaleX(${this.facing})` },
        { transform: `translate(${targetX}px, ${targetY}px) scaleX(${this.facing})` }
      ],
      {
        duration,
        easing: 'linear',
        fill: 'forwards'
      }
    );

    this.activeAnimation.onfinish = () => {
      this.currentX = targetX;
      this.currentY = targetY;
      this.activeAnimation = null;

      this.maybeGrazeThenContinue();
    };
  }

  private maybeGrazeThenContinue(): void {
    const host = this.elRef.nativeElement;
    const shouldGraze = Math.random() < 0.24;

    if (!shouldGraze) {
      const pause = this.randomRange(120, 320);
      this.moveTimer = setTimeout(() => this.scheduleNextMove(), pause);
      return;
    }

    host.classList.add('horse-grazing');
    const grazeDuration = this.randomRange(1300, 2200);
    this.moveTimer = setTimeout(() => {
      host.classList.remove('horse-grazing');
      const pause = this.randomRange(120, 280);
      this.moveTimer = setTimeout(() => this.scheduleNextMove(), pause);
    }, grazeDuration);
  }

  private randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
