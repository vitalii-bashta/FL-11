import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { ReadComponent } from './read/read.component';


const routes: Routes = [
  { path:'', redirectTo: '/newsList', pathMatch: 'full' },
  { path:'newsList', component: HomeComponent },
  { path:'create', component: CreateComponent },
  { path:'newsList/:newsId', component: ReadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
