import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commandes',
  imports: [CommonModule, Sidebar, Navbar],
  providers: [DatePipe],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class Commandes implements OnInit {
  private apiUrl = 'http://localhost:5000/api';
  sidebarCollapsed = false;
  commandes: any[] = [];
  loading = true;
  stats = { total: 0, attente: 0, cours: 0, livree: 0 };

  constructor(private http: HttpClient) {}
  ngOnInit() { this.loadCommandes(); }
  onSidebarToggle(c: boolean) { this.sidebarCollapsed = c; }

  loadCommandes() {
    this.http.get(`${this.apiUrl}/commandes/admin/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe({
      next: (res: any) => {
        if (res.success) { this.commandes = res.commandes; this.calculateStats(); }
        this.loading = false;
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  calculateStats() {
    this.stats.total   = this.commandes.length;
    this.stats.attente = this.commandes.filter(c => c.statut === 'en_attente').length;
    this.stats.cours   = this.commandes.filter(c => c.statut === 'en_cours').length;
    this.stats.livree  = this.commandes.filter(c => c.statut === 'livrée').length;
  }

  getStatutClass(statut: string): string {
    const m: Record<string, string> = {
      livrée: 'status-badge badge-success',
      en_cours: 'status-badge badge-info',
      en_attente: 'status-badge badge-warning',
      annulée: 'status-badge badge-danger',
    };
    return m[statut] || 'status-badge';
  }

  getStatutLabel(statut: string): string {
    const m: Record<string, string> = {
      livrée: 'Livrée', en_cours: 'En cours', en_attente: 'En attente', annulée: 'Annulée',
    };
    return m[statut] || statut;
  }

  getStatutIcon(statut: string): string {
    const m: Record<string, string> = {
      livrée: 'check_circle', en_cours: 'local_shipping',
      en_attente: 'schedule',  annulée: 'cancel',
    };
    return m[statut] || 'help';
  }

  changerStatut(commande: any, newStatut: string) {
    this.http.put(`${this.apiUrl}/commandes/${commande._id}/statut`, { statut: newStatut }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe({
      next: (res: any) => { if (res.success) { commande.statut = newStatut; this.calculateStats(); } },
      error: (err) => console.error(err)
    });
  }
}