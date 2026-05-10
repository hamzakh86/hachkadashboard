import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Navbar } from '../../components/navbar/navbar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  imports: [CommonModule, FormsModule, Sidebar, Navbar],
  templateUrl: './produits.html',
  styleUrl: './produits.css',
})
export class Produits implements OnInit {
  private apiUrl = 'http://localhost:5000/api';
  sidebarCollapsed = false;

  produits: any[] = [];
  showModal = false;
  isEdit = false;
  currentProduit: any = {};

  formData = {
    nom: '', prix: 0, ancienPrix: 0,
    categorie: 'Vestes', tailles: [] as string[],
    image: '', badge: '', stock: 100,
  };

  categories = ['Vestes', 'Robes', 'Chemises', 'Pantalons', 'Accessoires'];
  taillesToutes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unique'];

  constructor(private http: HttpClient) {}
  ngOnInit() { this.loadProduits(); }
  onSidebarToggle(c: boolean) { this.sidebarCollapsed = c; }

  loadProduits() {
    this.http.get(`${this.apiUrl}/produits`).subscribe({
      next: (res: any) => { this.produits = res.produits || []; },
      error: (err) => console.error(err),
    });
  }

  openCreateModal() { this.isEdit = false; this.showModal = true; this.resetForm(); }
  openEditModal(p: any) { this.isEdit = true; this.showModal = true; this.currentProduit = p; this.formData = { ...p }; }
  closeModal() { this.showModal = false; this.resetForm(); }

  resetForm() {
    this.formData = { nom: '', prix: 0, ancienPrix: 0, categorie: 'Vestes', tailles: [], image: '', badge: '', stock: 100 };
  }

  toggleTaille(t: string) {
    const i = this.formData.tailles.indexOf(t);
    i > -1 ? this.formData.tailles.splice(i, 1) : this.formData.tailles.push(t);
  }

  isTailleSelected(t: string): boolean { return this.formData.tailles.includes(t); }

  saveProduit() {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    const req = this.isEdit
      ? this.http.put(`${this.apiUrl}/produits/${this.currentProduit._id}`, this.formData, { headers })
      : this.http.post(`${this.apiUrl}/produits`, this.formData, { headers });

    req.subscribe({ next: () => { this.loadProduits(); this.closeModal(); }, error: (e) => console.error(e) });
  }

  deleteProduit(id: string) {
    if (!confirm('Supprimer ce produit ?')) return;
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    this.http.delete(`${this.apiUrl}/produits/${id}`, { headers }).subscribe({
      next: () => this.loadProduits(), error: (e) => console.error(e)
    });
  }
}