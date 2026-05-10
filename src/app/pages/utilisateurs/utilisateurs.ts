import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-utilisateurs',
  imports: [CommonModule, Sidebar, Navbar],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css',
})
export class Utilisateurs implements OnInit {
  private apiUrl = 'http://localhost:5000/api';
  sidebarCollapsed = false;
  utilisateurs: any[] = [];
  loading = true;

  get adminCount() { return this.utilisateurs.filter(u => u.role === 'admin').length; }

  constructor(private http: HttpClient) {}
  ngOnInit() { this.loadUtilisateurs(); }
  onSidebarToggle(c: boolean) { this.sidebarCollapsed = c; }

  loadUtilisateurs() {
    this.http.get(`${this.apiUrl}/utilisateurs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe({
      next: (res: any) => { if (res.success) this.utilisateurs = res.utilisateurs; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  deleteUser(id: string) {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    this.http.delete(`${this.apiUrl}/utilisateurs/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).subscribe({
      next: (res: any) => { if (res.success) this.utilisateurs = this.utilisateurs.filter(u => u._id !== id); },
      error: (err) => alert('Erreur: ' + (err.error?.message || 'Impossible de supprimer'))
    });
  }
 
  rewardPoints(user: any) {
    const newPoints = prompt(`Modifier les points de ${user.nom}:`, user.points);
    if (newPoints !== null) {
      this.http.patch(`${this.apiUrl}/utilisateurs/${user._id}/points`, { points: Number(newPoints) }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe({
        next: (res: any) => { if (res.success) user.points = Number(newPoints); },
        error: (err) => alert('Erreur: ' + (err.error?.message || 'Impossible de modifier'))
      });
    }
  }
}