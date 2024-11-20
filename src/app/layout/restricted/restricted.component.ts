import { Component, AfterViewInit} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restricted',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './restricted.component.html',
  styleUrl: './restricted.component.scss'
})
export class RestrictedComponent {

}
