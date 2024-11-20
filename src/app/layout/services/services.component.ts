import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent  {


  activeTab: string = 'automotive'; // Default active tab
isScrolled: any;
  isMenuOpen: boolean | undefined;
  // Method to set the active tab
  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  } 
}
