import { Component, Input } from '@angular/core';
import { Article, Commentaire } from '../../service/article/article.model';
import { CommentaireService } from '../../service/commentaire/commentaire.service';
import { HeaderComponent } from '../header/header.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../service/article/article.service';

@Component({
  selector: 'app-commentaire',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MaterialModule, HeaderComponent,FormsModule],
  templateUrl: './commentaire.component.html',
  styleUrl: './commentaire.component.scss'
})
export class CommentaireComponent{
  @Input() articleId!: number;
  userId!: number;
  commentaires: Commentaire[] = [];
  nouveauCommentaire: string = '';
  showComments: { [key: number]: boolean } = {};
  allArticles: Article[] = [];

  constructor(private commentaireService: CommentaireService,private articleService: ArticleService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe(articles => {
      this.allArticles = articles;
    });
  }

  toggleComments(articleId: number) {
    this.showComments[articleId] = !this.showComments[articleId]; 
    if (this.showComments[articleId]) {
      this.getCommentaires(articleId); 
    }
  }

  getCommentaires(articleId: number) {
    this.commentaireService.getCommentaires(articleId).subscribe(commentaires => {
      this.commentaires = commentaires;
    });
  }

  ajouterCommentaire(articleId: number) {
    const userId = this.userId;
    if (this.nouveauCommentaire.trim()) {
      this.commentaireService.addCommentaire(articleId, userId, this.nouveauCommentaire).subscribe(commentaire => {
        this.commentaires.push(commentaire);
        this.nouveauCommentaire = ''; 
      });
    }
  }

  supprimerCommentaire(commentaireId: number) {
    const userId = this.userId;
    this.commentaireService.deleteCommentaire(this.commentaires[0].article.id!, commentaireId, userId).subscribe(() => {
      this.commentaires = this.commentaires.filter(c => c.id !== commentaireId); 
    });
  }

}
