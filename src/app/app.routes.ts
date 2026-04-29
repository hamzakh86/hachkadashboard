import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Produits } from './pages/produits/produits';
import { Utilisateurs } from './pages/utilisateurs/utilisateurs';
import { Commandes } from './pages/commandes/commandes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'produits', component: Produits },
  { path: 'utilisateurs', component: Utilisateurs },
  { path: 'commandes', component: Commandes },
  { path: '**', redirectTo: 'login' },
];