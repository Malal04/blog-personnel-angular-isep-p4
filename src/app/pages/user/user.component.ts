import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../service/article/article.model';
import { AmitieService } from '../../service/amitie/amitie.service';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/auth/user.service';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MaterialModule, HeaderComponent],
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  allAmie: User[] = [];
  amieForm!: FormGroup;
  userId: number | null = null;
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.allAmie = users.filter((user) => user.id!== this.userId);
        this.allAmie = users;
      },
      (error) => {
        console.error(error);
        this.handleError('Erreur lors de la récupération des utilisateurs');
      }
    );
    this.amieForm = this.fb.group({
      userAmi: ['', Validators.required]
    });
  }
  handleError(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
