import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  @Input() sidebarCollapsed = false;
  user: any = null;
  currentPage = 'Dashboard';

  private pageMap: Record<string, string> = {
    '/dashboard':     'Dashboard',
    '/produits':      'Produits',
    '/utilisateurs':  'Utilisateurs',
    '/commandes':     'Commandes',
  };

  get sidebarWidth(): string {
    return this.sidebarCollapsed ? '72px' : '260px';
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.currentPage = this.pageMap[this.router.url] || 'Dashboard';
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.currentPage = this.pageMap[e.urlAfterRedirects] || 'Dashboard';
      });
  }
}