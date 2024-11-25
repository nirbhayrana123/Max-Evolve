import { Component, AfterViewInit} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import $ from 'jquery';
import { CommonModule, DatePipe,} from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe],
})
export class HeaderComponent implements AfterViewInit {


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






scrollToFooter($event: MouseEvent) {
throw new Error('Method not implemented.');
}

isToggled: boolean = false;

toggleClass() {
  this.isToggled = !this.isToggled;
}
 

  ngAfterViewInit(): void {
    $(document).ready(function () { 
      $(".menu-item").hover(
        function () {
          $(this).children(".mega-menu").stop(true, true).slideDown(200);
        },
        function () {
          $(this).children(".mega-menu").stop(true, true).slideUp(200);
        }
      );

    });
  }

   menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }





  scrollToSection(sectionId: string): void { const element = document.getElementById(sectionId); if (element) { element.scrollIntoView({ behavior: 'smooth' });}}




  
  
}



