import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { HeaderComponent } from '../header/header.component';
import { ArticleService } from '../../service/article/article.service';
import { AuthService } from '../../service/auth/auth.service';
import { Article } from '../../service/article/article.model';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MaterialModule, HeaderComponent],
  providers: [ArticleService, AuthService],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss'
})
export class CreateArticleComponent {
  articles: Article[] = [];
  articleForm!: FormGroup;
  userId: number | null = null;
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.articleForm = this.fb.group({
      titre: [null, Validators.required],
      img: [null],
      contenu: [null, Validators.required],
      estPublic: [true,Validators.required],
      allowComments: [true,Validators.required]
    });
  }

  createArticle(): void {
    if (this.userId === null) {
        console.log('Veuillez vous connecter pour créer un article');
        this.errors.push('Veuillez vous connecter pour créer un article');
        return;
    }

    const data = this.articleForm.value;
    this.articleService.createArticle(data, this.userId).subscribe(
        response => {
            console.log('Article créé:', response);
            this.router.navigate(['/article']);
            this.articleForm.reset();
            this.errors = [];
        },
        error => {
            console.error('Erreur lors de la création de l\'article:', error);
            this.router.navigate(['/article']);
            this.errors = ['Erreur lors de la création de l\'article'];
            this.articleForm.reset();

        }
    );
  }

}
