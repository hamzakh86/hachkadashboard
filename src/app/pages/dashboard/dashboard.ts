import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Sidebar, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats = [
    { icon: '📦', label: 'Produits', value: 48, bg: 'from-blue-500 to-blue-600' },
    { icon: '👥', label: 'Utilisateurs', value: 127, bg: 'from-green-500 to-green-600' },
    { icon: '📋', label: 'Commandes', value: 89, bg: 'from-purple-500 to-purple-600' },
    { icon: '💰', label: 'Revenus', value: '12,450 TND', bg: 'from-yellow-500 to-yellow-600' },
  ];

  recentOrders = [
    { id: '#CMD001', client: 'Ahmed Ben Ali', produit: 'Veste en cuir', prix: 250, statut: 'livrée' },
    { id: '#CMD002', client: 'Fatma Mansour', produit: 'Robe élégante', prix: 180, statut: 'en_cours' },
    { id: '#CMD003', client: 'Mohamed Trabelsi', produit: 'Chemise blanche', prix: 85, statut: 'en_attente' },
    { id: '#CMD004', client: 'Leila Karoui', produit: 'Accessoires mode', prix: 45, statut: 'livrée' },
    { id: '#CMD005', client: 'Karim Gharbi', produit: 'Pantalon chic', prix: 120, statut: 'en_cours' },
  ];

  ngOnInit() {}

  getStatutClass(statut: string): string {
    const classes: any = {
      livrée: 'bg-green-500/10 text-green-500',
      en_cours: 'bg-blue-500/10 text-blue-500',
      en_attente: 'bg-yellow-500/10 text-yellow-500',
    };
    return classes[statut] || '';
  }

  getStatutLabel(statut: string): string {
    const labels: any = {
      livrée: '✓ Livrée',
      en_cours: '⏳ En cours',
      en_attente: '⏸ En attente',
    };
    return labels[statut] || statut;
  }
}