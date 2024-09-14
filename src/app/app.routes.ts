import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ArticleComponent } from './pages/article/article.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'article', component: ArticleComponent},
    // { path: '**', redirectTo: '' }
];
