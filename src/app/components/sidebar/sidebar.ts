import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = [
    { icon: '📊', label: 'Dashboard', route: '/dashboard' },
    { icon: '📦', label: 'Produits', route: '/produits' },
    { icon: '👥', label: 'Utilisateurs', route: '/utilisateurs' },
    { icon: '📋', label: 'Commandes', route: '/commandes' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  deconnecter() {
    this.authService.deconnecter();
    this.router.navigate(['/login']);
  }
}