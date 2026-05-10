const fs = require('fs');
const path = require('path');

const webDir = path.join(__dirname, '../HachkaWeb');

const files = {
  'src/app/app.routes.ts': `
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
`,
  'src/app/pages/home/home.component.ts': `
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService, Produit } from '../../services/produit.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  products: Produit[] = [];

  constructor(private produitService: ProduitService) {}

  ngOnInit() {
    this.produitService.getProduits().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Erreur', err)
    });
  }

  getImageSrc(imagePath: string): string {
    if (!imagePath) return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80';
    if (imagePath.startsWith('http')) return imagePath;
    return 'http://localhost:5000/' + imagePath.replace(/\\\\/g, '/');
  }

  addToCart(product: Produit) {
    alert(product.nom + ' ajouté au panier ! (Fonctionnalité en cours de développement)');
  }
}
`,
  'src/app/pages/home/home.component.html': `
<!-- Hero Section -->
<div class="relative bg-white overflow-hidden">
  <div class="max-w-7xl mx-auto">
    <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20">
      <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div class="sm:text-center lg:text-left">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Découvrez notre</span>
            <span class="block text-indigo-600 xl:inline">nouvelle collection</span>
          </h1>
          <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Trouvez les meilleurs articles au meilleur prix. Une sélection exclusive de vêtements, chaussures et accessoires modernes.
          </p>
          <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300">
                Acheter maintenant
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Shopping">
  </div>
</div>

<!-- Products Section -->
<div class="bg-gray-50 py-16 sm:py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Produits Populaires</h2>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      <div *ngFor="let product of products" class="group relative bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div class="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-80">
          <img [src]="getImageSrc(product.image)" [alt]="product.nom" class="w-full h-full object-center object-cover sm:w-full sm:h-full">
        </div>
        <div class="flex-1 p-5 space-y-2 flex flex-col justify-between">
          <div>
            <p class="text-sm text-gray-500">{{product.categorie}}</p>
            <h3 class="text-lg font-medium text-gray-900">
              {{product.nom}}
            </h3>
          </div>
          <div class="flex items-center justify-between mt-4">
            <p class="text-xl font-bold text-gray-900">{{product.prix}} TND</p>
            <button (click)="addToCart(product)" class="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300 z-10 relative cursor-pointer">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`,
  'src/app/app.component.ts': `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: \`
    <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex-shrink-0 flex items-center cursor-pointer" routerLink="/">
            <span class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Hachka</span>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a routerLink="/" class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 font-medium text-sm">Accueil</a>
            <a routerLink="/boutique" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-medium text-sm">Boutique</a>
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-400 hover:text-indigo-600 transition">
              <span class="material-symbols-rounded">person</span>
            </button>
            <button class="p-2 text-gray-400 hover:text-indigo-600 transition relative">
              <span class="material-symbols-rounded">shopping_cart</span>
              <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">0</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="min-h-screen bg-gray-50">
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-400">&copy; 2026 Hachka. Tous droits réservés.</p>
      </div>
    </footer>
  \`
})
export class AppComponent {}
`,
  'src/index.html': `
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-z">
  <title>Hachka Web - Boutique Officielle</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <!-- Material Symbols for beautiful icons -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body>
  <app-root></app-root>
</body>
</html>
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(webDir, relativePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content.trim());
  console.log('Created: ' + fullPath);
}
