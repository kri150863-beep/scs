import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';
import { EventBusService } from '../../../core/infrastructure/services/event-bus.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, LoaderComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  isLoading: boolean = false;
  currentPath: string = '';

  constructor(private eventBus: EventBusService, private router: Router) {}

  ngOnInit() {
    this.eventBus.loading$.subscribe(loading => {
      this.isLoading = loading;
    });

    this.currentPath = this.router.url;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.urlAfterRedirects;
      });
  }

  isContactPage(): boolean {
    return this.currentPath === '/dashboard/contact-us';
  }
}
