import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  isSubmitted = false;
  errors: string[] = [];
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nomComplete: [null, Validators.required],
      userNom: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      configPassword: [null, Validators.required]
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errors = [];

    if (this.registerForm.invalid) {
      this.errors.push("Veuillez remplir tous les champs requis.");
      return;
    }

    const formValues = this.registerForm.value;

    if (formValues.password !== formValues.configPassword) {
      this.errors.push("Les mots de passe ne correspondent pas.");
      return;
    }

    this.register();
  }

  register(): void {
    const { nomComplete, userNom, email, password , configPassword} = this.registerForm.value;

    this.authService.register(nomComplete, userNom, email, password, configPassword).subscribe(
      response => {
        console.log('Réponse de l\'API', response);
        
        // Supposons que la réponse est un objet avec une propriété 'message'
        if (response && response.message) {
            console.log('Inscription réussie:', response.message);
            
        } else {
            console.error('Réponse inattendue de l\'API', response);
        }
      },
      error => {
        console.error('Erreur lors de l\'inscription', error);
        const errorMessage = error.error?.message || 'Une erreur s\'est produite lors de l\'inscription.';
        this.errors = [errorMessage];
        this.router.navigate(['/']);
      }
    );
  }

}
