import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, Sidebar, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private apiUrl = 'http://localhost:5000/api';
  sidebarCollapsed = false;

  today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  stats = [
    { icon: 'inventory_2',  label: 'Produits',      value: 0,        trend: 12,  iconBg: 'rgba(99,102,241,0.12)',  iconColor: '#818cf8' },
    { icon: 'group',        label: 'Utilisateurs',  value: 0,        trend: 8,   iconBg: 'rgba(16,185,129,0.12)',  iconColor: '#34d399' },
    { icon: 'receipt_long', label: 'Commandes',     value: 0,        trend: 5,   iconBg: 'rgba(59,130,246,0.12)',  iconColor: '#60a5fa' },
    { icon: 'payments',     label: 'Revenus',       value: '0 TND',  trend: 18,  iconBg: 'rgba(245,158,11,0.12)',  iconColor: '#fbbf24' },
    { icon: 'mail',         label: 'Abonnés',       value: 0,        trend: 15,  iconBg: 'rgba(236,72,153,0.12)',  iconColor: '#ec4899' },
    { icon: 'confirmation_number', label: 'Coupons',   value: 0,        trend: 2,   iconBg: 'rgba(139,92,246,0.12)',  iconColor: '#8b5cf6' },
  ];

  recentOrders: any[] = [];

  activity = [
    { text: 'Nouvelle commande reçue',     time: 'Il y a 2 min',   color: '#6366f1' },
    { text: 'Utilisateur inscrit',          time: 'Il y a 15 min',  color: '#10b981' },
    { text: 'Produit mis à jour',           time: 'Il y a 1h',      color: '#f59e0b' },
    { text: 'Commande livrée',              time: 'Il y a 2h',      color: '#3b82f6' },
    { text: 'Nouveau produit ajouté',       time: 'Il y a 3h',      color: '#8b5cf6' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStats();
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  loadStats() {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    this.http.get(`${this.apiUrl}/app-data/stats`, { headers }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.stats[0].value = res.stats.produits;
          this.stats[1].value = res.stats.utilisateurs;
          this.stats[2].value = res.stats.commandes;
          this.stats[3].value = `${res.stats.revenus?.toLocaleString('fr-FR') || 0} TND`;
          this.stats[4].value = res.stats.abonnés;
          this.stats[5].value = res.stats.coupons;
          this.recentOrders = res.recentOrders || [];
        }
      },
      error: (err) => console.error('Erreur stats:', err)
    });
  }

  getStatutClass(statut: string): string {
    const map: Record<string, string> = {
      livrée:     'status-badge badge-success',
      en_cours:   'status-badge badge-info',
      en_attente: 'status-badge badge-warning',
      annulée:    'status-badge badge-danger',
    };
    return map[statut] || 'status-badge badge-secondary';
  }

  getStatutLabel(statut: string): string {
    const map: Record<string, string> = {
      livrée:     'Livrée',
      en_cours:   'En cours',
      en_attente: 'En attente',
      annulée:    'Annulée',
    };
    return map[statut] || statut;
  }
}