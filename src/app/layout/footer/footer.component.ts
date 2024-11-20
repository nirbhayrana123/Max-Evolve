import { CommonModule } from '@angular/common';
import { Component,  OnInit, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive] ,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],  
  providers: [DatePipe],
})


export class FooterComponent implements AfterViewInit, OnInit {

  




  currentYear: number = new Date().getFullYear();
  todayDate: string = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.updateDate();
  }

  updateDate(): void {
    const today = new Date();
    this.todayDate = this.datePipe.transform(today, 'MMMM dd, yyyy') || ''; // Example: "November 15, 2024"
  }

  private cardElement: HTMLElement | null = null;
  private animationFrameId: number | null = null;
  private currentRotateX = 0;
  private currentRotateY = 0;
  private targetRotateX = 0;
  private targetRotateY = 0;
  private initialRotateX = 0;
  private initialRotateY = 0;

  ngAfterViewInit() {
    this.cardElement = document.querySelector('.boarding-pass');
    if (this.cardElement) {
      this.initialize();
    }
  }

  private updateCardRotation() {
    if (this.cardElement) {
      this.cardElement.style.setProperty('--rotateX', `${this.currentRotateX}deg`);
      this.cardElement.style.setProperty('--rotateY', `${this.currentRotateY}deg`);
    }
  }

  private smoothRotate() {
    this.currentRotateX += (this.targetRotateX - this.currentRotateX) * 0.1;
    this.currentRotateY += (this.targetRotateY - this.currentRotateY) * 0.1;
    this.updateCardRotation();
  }

  private startAnimation() {
    this.smoothRotate();
    this.animationFrameId = requestAnimationFrame(() => this.startAnimation());
  }

  private onCardMouseMove(event: MouseEvent) {
    if (this.cardElement) {
      const rect = this.cardElement.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      this.targetRotateX = ((centerY - offsetY) / centerY) * 15;
      this.targetRotateY = ((offsetX - centerX) / centerX) * 10;

      if (!this.animationFrameId) {
        this.startAnimation();
      }
    }
  }

  private onCardMouseLeave() {
    this.targetRotateX = this.initialRotateX;
    this.targetRotateY = this.initialRotateY;

    const resetRotationAnimation = () => {
      this.currentRotateX += (this.targetRotateX - this.currentRotateX) * 0.10;
      this.currentRotateY += (this.targetRotateY - this.currentRotateY) * 0.10;
      this.updateCardRotation();

      if (
        Math.abs(this.currentRotateX - this.targetRotateX) > 0.10 ||
        Math.abs(this.currentRotateY - this.targetRotateY) > 0.10
      ) {
        this.animationFrameId = requestAnimationFrame(resetRotationAnimation);
      } else {
        cancelAnimationFrame(this.animationFrameId!);
        this.animationFrameId = null;
      }
    };

    resetRotationAnimation();
  }

  private addCardEventListeners() {
    if (this.cardElement) {
      this.cardElement.addEventListener('mousemove', (event) => this.onCardMouseMove(event));
      this.cardElement.addEventListener('mouseleave', () => this.onCardMouseLeave());
    }
  }

  private initialize() {
    this.initialRotateX = this.currentRotateX;
    this.initialRotateY = this.currentRotateY;
    this.addCardEventListeners();
  }
}
