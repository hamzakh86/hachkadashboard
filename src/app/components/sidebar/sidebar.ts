import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  collapsed = false;

  @Output() collapsedChange = new EventEmitter<boolean>();

  menuItems = [
    { icon: 'dashboard',       label: 'Dashboard',      route: '/dashboard',      badge: '' },
    { icon: 'inventory_2',     label: 'Produits',       route: '/produits',       badge: '' },
    { icon: 'group',           label: 'Utilisateurs',   route: '/utilisateurs',   badge: '' },
    { icon: 'receipt_long',    label: 'Commandes',      route: '/commandes',      badge: '' },
    { icon: 'confirmation_number', label: 'Coupons',      route: '/coupons',      badge: '' },
    { icon: 'mail',            label: 'Newsletter',   route: '/newsletter',   badge: '' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) this.collapsed = JSON.parse(saved);
    this.collapsedChange.emit(this.collapsed);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('sidebar-collapsed', JSON.stringify(this.collapsed));
    this.collapsedChange.emit(this.collapsed);
  }

  deconnecter() {
    this.authService.deconnecter();
    this.router.navigate(['/login']);
  }
}