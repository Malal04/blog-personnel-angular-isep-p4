import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errors: string[] = [];
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userNom: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errors = [];

    if (this.loginForm.valid) {
      this.login();
    } else {
      this.errors = ['Veuillez remplir tous les champs requis.'];
    }
  }

  login(): void {
    this.isSubmitted = true;
    const { userNom, password } = this.loginForm.value;
    this.errors = []; // Reset des erreurs s'il y en a une

    this.authService.login(userNom, password).subscribe(
      (res) => {
        if (res.token) {
          console.log('Connexion réussie, token :', res.token);
          this.router.navigate(['/article']);
        } else {
          this.errors = ['Une erreur est survenue lors de la connexion'];
        }
      },
      (error) => {
        console.error('Erreur lors de la connexion :', error);
        this.errors = [error.error.message || 'Une erreur est survenue lors de la connexion'];
        this.isSubmitted = false;
        this.loginForm.reset();
        this.router.navigate(['/']);
      }
    );
  }
}
