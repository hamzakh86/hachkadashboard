const fs = require('fs');
const path = require('path');

const webDir = path.join(__dirname, '../HachkaWeb');

const files = {
  'src/app/pages/register/register.component.ts': `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  // Logic will be added here
}
`,
  'src/app/pages/register/register.component.html': `
<div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
    <div>
      <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">Créer un compte</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Rejoignez Hachka et profitez de nos offres
      </p>
    </div>
    <form class="mt-8 space-y-6" action="#" method="POST">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="name" class="sr-only">Nom complet</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-rounded text-gray-400">person</span>
            </div>
            <input id="name" name="name" type="text" required class="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nom complet">
          </div>
        </div>
        <div>
          <label for="email-address" class="sr-only">Adresse Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-rounded text-gray-400">mail</span>
            </div>
            <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Adresse Email">
          </div>
        </div>
        <div>
          <label for="password" class="sr-only">Mot de passe</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-symbols-rounded text-gray-400">lock</span>
            </div>
            <input id="password" name="password" type="password" required class="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mot de passe">
          </div>
        </div>
      </div>

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
          S'inscrire
        </button>
      </div>
    </form>
    
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Déjà un compte ? 
        <a routerLink="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Se connecter</a>
      </p>
    </div>
  </div>
</div>
`,
  'src/app/pages/cart/cart.component.ts': `
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [
    { id: '1', nom: 'Exemple Produit 1', prix: 45, quantite: 1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80' },
    { id: '2', nom: 'Exemple Produit 2', prix: 120, quantite: 2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' }
  ];

  total = 0;

  ngOnInit() {
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.prix * item.quantite), 0);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateTotal();
  }
}
`,
  'src/app/pages/cart/cart.component.html': `
<div class="bg-gray-50 min-h-screen py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Votre Panier</h1>

    <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
      <div class="lg:col-span-8">
        <div class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <ul role="list" class="divide-y divide-gray-200">
            <li *ngFor="let item of cartItems; let i = index" class="flex py-6 px-6 sm:px-8 hover:bg-gray-50 transition">
              <div class="flex-shrink-0">
                <img [src]="item.image" alt="Product" class="w-24 h-24 rounded-xl object-cover object-center sm:w-32 sm:h-32">
              </div>

              <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-lg">
                        <a href="#" class="font-medium text-gray-700 hover:text-gray-800">{{ item.nom }}</a>
                      </h3>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Taille: M</p>
                    <p class="mt-1 text-sm text-gray-500">Qté: {{ item.quantite }}</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <p class="text-lg font-bold text-gray-900 text-right">{{ item.prix * item.quantite }} TND</p>
                    <div class="absolute top-0 right-0">
                      <button (click)="removeItem(i)" type="button" class="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition">
                        <span class="sr-only">Remove</span>
                        <span class="material-symbols-rounded">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li *ngIf="cartItems.length === 0" class="py-12 text-center">
              <span class="material-symbols-rounded text-6xl text-gray-300">shopping_cart</span>
              <p class="mt-4 text-gray-500 text-lg">Votre panier est vide.</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Order summary -->
      <div class="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8 lg:mt-0 lg:col-span-4">
        <h2 class="text-lg font-medium text-gray-900">Résumé de la commande</h2>

        <dl class="mt-6 space-y-4 text-sm text-gray-600">
          <div class="flex items-center justify-between">
            <dt>Sous-total</dt>
            <dd class="font-medium text-gray-900">{{ total }} TND</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt class="flex items-center text-sm">
              <span>Frais de livraison</span>
            </dt>
            <dd class="font-medium text-gray-900">7.00 TND</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt class="text-base font-medium text-gray-900">Total</dt>
            <dd class="text-xl font-bold text-indigo-600">{{ total > 0 ? total + 7 : 0 }} TND</dd>
          </div>
        </dl>

        <div class="mt-8">
          <button type="submit" [disabled]="cartItems.length === 0" class="w-full bg-indigo-600 border border-transparent rounded-xl shadow-sm py-4 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed">
            Passer à la caisse
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`,
  'src/app/app.routes.ts': `
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'panier', component: CartComponent },
  { path: '**', redirectTo: '' }
];
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
