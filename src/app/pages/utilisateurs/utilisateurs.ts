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
  
  utilisateurs: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUtilisateurs();
  }

  loadUtilisateurs() {
    // Pour l'instant on simule des données car on n'a pas de route GET /users
    this.utilisateurs = [
      { _id: '1', nom: 'Khaled Test', email: 'khaled@test.com', telephone: '55123456', role: 'admin', createdAt: new Date() },
      { _id: '2', nom: 'Ahmed Ben Ali', email: 'ahmed@example.com', telephone: '52345678', role: 'user', createdAt: new Date() },
      { _id: '3', nom: 'Fatma Mansour', email: 'fatma@example.com', telephone: '58765432', role: 'user', createdAt: new Date() },
      { _id: '4', nom: 'Mohamed Trabelsi', email: 'mohamed@example.com', telephone: '51234567', role: 'user', createdAt: new Date() },
      { _id: '5', nom: 'Leila Karoui', email: 'leila@example.com', telephone: '59876543', role: 'user', createdAt: new Date() },
    ];
    this.loading = false;
  }

  getRoleBadge(role: string): string {
    return role === 'admin' 
      ? 'bg-yellow-500/10 text-yellow-500' 
      : 'bg-blue-500/10 text-blue-500';
  }

  getRoleLabel(role: string): string {
    return role === 'admin' ? '👑 Admin' : '👤 Client';
  }

  deleteUser(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurs = this.utilisateurs.filter(u => u._id !== id);
    }
  }
}