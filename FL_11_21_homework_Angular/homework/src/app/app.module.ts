import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { ReadComponent } from './read/read.component';
import { ListItemComponent } from './list-item/list-item.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HomeComponent,
    ReadComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

