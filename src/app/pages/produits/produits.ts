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
  
  produits: any[] = [];
  showModal = false;
  isEdit = false;
  currentProduit: any = {};

  formData = {
    nom: '',
    prix: 0,
    ancienPrix: 0,
    categorie: 'Vestes',
    tailles: [] as string[],
    image: '',
    badge: '',
    stock: 100,
  };

  categories = ['Vestes', 'Robes', 'Chemises', 'Pantalons', 'Accessoires'];
  taillesToutes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unique'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits() {
    this.http.get(`${this.apiUrl}/produits`).subscribe({
      next: (res: any) => {
        this.produits = res.produits || [];
      },
      error: (err) => console.error(err),
    });
  }

  openCreateModal() {
    this.isEdit = false;
    this.showModal = true;
    this.resetForm();
  }

  openEditModal(produit: any) {
    this.isEdit = true;
    this.showModal = true;
    this.currentProduit = produit;
    this.formData = { ...produit };
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      nom: '',
      prix: 0,
      ancienPrix: 0,
      categorie: 'Vestes',
      tailles: [],
      image: '',
      badge: '',
      stock: 100,
    };
  }

  toggleTaille(taille: string) {
    const index = this.formData.tailles.indexOf(taille);
    if (index > -1) {
      this.formData.tailles.splice(index, 1);
    } else {
      this.formData.tailles.push(taille);
    }
  }

  isTailleSelected(taille: string): boolean {
    return this.formData.tailles.includes(taille);
  }

  saveProduit() {
    if (this.isEdit) {
      this.http.put(`${this.apiUrl}/produits/${this.currentProduit._id}`, this.formData).subscribe({
        next: () => {
          this.loadProduits();
          this.closeModal();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.http.post(`${this.apiUrl}/produits`, this.formData).subscribe({
        next: () => {
          this.loadProduits();
          this.closeModal();
        },
        error: (err) => console.error(err),
      });
    }
  }

  deleteProduit(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.http.delete(`${this.apiUrl}/produits/${id}`).subscribe({
        next: () => this.loadProduits(),
        error: (err) => console.error(err),
      });
    }
  }
}