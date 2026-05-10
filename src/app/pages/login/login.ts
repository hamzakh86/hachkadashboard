import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  motDePasse = '';
  loading = false;
  erreur = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email || !this.motDePasse) {
      this.erreur = 'Veuillez saisir votre email et votre mot de passe';
      return;
    }

    this.loading = true;
    this.erreur = '';

    this.authService.login(this.email, this.motDePasse).subscribe({
      next: (response) => {
        if (response.success) {
          this.authService.sauvegarderToken(response.token, response.user);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.erreur = err.error?.message || 'Email ou mot de passe incorrect';
      },
      complete: () => { this.loading = false; },
    });
  }
}