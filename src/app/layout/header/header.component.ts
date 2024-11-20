import { Component, AfterViewInit} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import $ from 'jquery';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
  
})
export class HeaderComponent implements AfterViewInit {
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










  
  
}



