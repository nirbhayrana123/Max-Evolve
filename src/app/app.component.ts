import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from './layout/footer/footer.component';
import {  Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  ngOnInit() {
    AOS.init({ });
    if (isPlatformBrowser(this.platformId)) {
      // Only runs in the browser
      // Code accessing document or window goes here
    }
  }

  title = 'max-evolve';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

 
}
