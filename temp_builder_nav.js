const fs = require('fs');
const path = require('path');

const webDir = path.join(__dirname, '../HachkaWeb');

const files = {
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
            <button routerLink="/login" class="p-2 text-gray-400 hover:text-indigo-600 transition">
              <span class="material-symbols-rounded">person</span>
            </button>
            <button routerLink="/panier" class="p-2 text-gray-400 hover:text-indigo-600 transition relative">
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
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(webDir, relativePath);
  fs.writeFileSync(fullPath, content.trim());
  console.log('Created: ' + fullPath);
}
