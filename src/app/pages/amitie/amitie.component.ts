import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { HeaderComponent } from '../header/header.component';
import { AmitieService } from '../../service/amitie/amitie.service';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/auth/user.service';
import { Amitie, User } from '../../service/article/article.model';
import { UserComponent } from "../user/user.component";



@Component({
  selector: 'app-amitie',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MaterialModule, HeaderComponent, UserComponent],
  providers: [AmitieService, AuthService],
  templateUrl: './amitie.component.html',
  styleUrls: ['./amitie.component.scss']
})
export class AmitieComponent implements OnInit {
  demandes: Amitie[] = [];
  allAmie: User[] = [];
  amieForm!: FormGroup;
  userId: number | null = null;
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private amitieService: AmitieService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId === null) {
      console.error('User ID est indéfini.');
      return;
    }
    this.amieForm = this.fb.group({
      amiId: [null, Validators.required],
    });
    this.getUsers();
    this.getDemandes();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.allAmie = users;
      },
      (error) => {
        this.handleError('Erreur lors de la récupération des utilisateurs');
      }
    );
  }

  private getDemandes(): void {
    if (this.userId !== null) {
      this.amitieService.getDemandes(this.userId).subscribe(
        (data) => {
          this.demandes = data;
        },
        (error) => {
          this.handleError('Erreur lors de la récupération des demandes');
        }
      );
    } else {
      this.handleError('User ID est indéfini.');
    }
  }

  accepterDemande(id: number): void {
    this.amitieService.accepterAmitie(id).subscribe(
      (message) => {
        console.log(message);
        this.getDemandes();
      },
      (error) => {
        this.handleError('Erreur lors de l\'acceptation de la demande');
      }
    );
  }

  rejecterDemande(id: number): void {
    this.amitieService.rejecterAmitie(id).subscribe(
      (message) => {
        console.log(message);
        this.getDemandes();
      },
      (error) => {
        this.handleError('Erreur lors du rejet de la demande');
      }
    );
  }

  onSubmit(): void {
    if (this.amieForm.valid) {
      const amiId = this.amieForm.value.amiId;
      if (this.userId !== null) {
        this.amitieService.demandeAmitie(this.userId, amiId).subscribe(
          (message) => {
            console.log(message);
            this.getDemandes();
            this.amieForm.reset(); 
          },
          (error) => {
            this.handleError('Erreur lors de l\'envoi de la demande');
          }
        );
      } else {
        this.handleError('User ID est indéfini.');
        this.getDemandes();
      }
    } else {
      this.handleError('Veuillez remplir tous les champs requis.');
    }
  }

  private handleError(message: string): void {
    console.error(message);
    this.errors.push(message);
  }

}