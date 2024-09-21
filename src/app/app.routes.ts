import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ArticleComponent } from './pages/article/article.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { AmitieComponent } from './pages/amitie/amitie.component';
import { CommentaireComponent } from './pages/commentaire/commentaire.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'article', component: ArticleComponent},
    {path:'create', component: CreateArticleComponent},
    {path:'amitie', component: AmitieComponent},
    {path:'get', component: CommentaireComponent},
    // { path: '**', redirectTo: '' }
];
