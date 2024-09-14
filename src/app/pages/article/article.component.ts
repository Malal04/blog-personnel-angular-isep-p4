import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../service/article/article.service';
import { AuthService } from '../../service/auth/auth.service';
import { Article } from '../../service/article/article.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MaterialModule, HeaderComponent],
  providers: [ArticleService, AuthService],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
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
      img: [null, Validators.required],
      contenu: [null, Validators.required],
      estPublic: [true],
      allowComments: [true]
    });
    this.getArticle();
    this.getAll();
  }

  getArticle(): void {
    if (this.userId !== null) {
      this.articleService.getAllArticles().subscribe(
        (data: Article[]) => {
          this.articles = data;
        },
        (error) => {
          this.errors.push('Erreur lors de la récupération des articles');
        }
      );
    }
  }

  getAll(): void {
    this.articleService.getAll().subscribe(
      (res)=> {
        console.log(res);
        this.articleForm = res;
      },
      (error)=> {
        console.error(error);
        console.error(error);
      }
    );
  }

  navigateToPost(id: number): void {
    this.router.navigate(['/view-post', id]);
  }

  navigateToComments(id: number): void {
    this.router.navigate(['/comments', id]);
  }
}
