import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commandes',
  imports: [CommonModule, Sidebar, Navbar],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class Commandes implements OnInit {
  private apiUrl = 'http://localhost:5000/api';
  
  commandes: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCommandes();
  }

  loadCommandes() {
    // Simulation de données
    this.commandes = [
      {
        _id: '1',
        utilisateur: { nom: 'Ahmed Ben Ali', email: 'ahmed@example.com' },
        articles: [{ nom: 'Veste en cuir', quantite: 1, prix: 250 }],
        total: 258,
        statut: 'livrée',
        adresseLivraison: { ville: 'Tunis', pays: 'Tunisie' },
        createdAt: new Date('2024-04-20'),
      },
      {
        _id: '2',
        utilisateur: { nom: 'Fatma Mansour', email: 'fatma@example.com' },
        articles: [{ nom: 'Robe élégante', quantite: 1, prix: 180 }],
        total: 188,
        statut: 'en_cours',
        adresseLivraison: { ville: 'Sfax', pays: 'Tunisie' },
        createdAt: new Date('2024-04-28'),
      },
      {
        _id: '3',
        utilisateur: { nom: 'Mohamed Trabelsi', email: 'mohamed@example.com' },
        articles: [{ nom: 'Chemise blanche', quantite: 2, prix: 85 }],
        total: 178,
        statut: 'en_attente',
        adresseLivraison: { ville: 'Sousse', pays: 'Tunisie' },
        createdAt: new Date('2024-04-29'),
      },
    ];
    this.loading = false;
  }

  getStatutClass(statut: string): string {
    const classes: any = {
      livrée: 'bg-green-500/10 text-green-500',
      en_cours: 'bg-blue-500/10 text-blue-500',
      en_attente: 'bg-yellow-500/10 text-yellow-500',
      annulée: 'bg-red-500/10 text-red-500',
    };
    return classes[statut] || '';
  }

  getStatutLabel(statut: string): string {
    const labels: any = {
      livrée: '✓ Livrée',
      en_cours: '⏳ En cours',
      en_attente: '⏸ En attente',
      annulée: '✗ Annulée',
    };
    return labels[statut] || statut;
  }

  changerStatut(commande: any, newStatut: string) {
    commande.statut = newStatut;
    // TODO: Appel API pour mettre à jour
  }
}