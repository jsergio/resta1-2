import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TelaComponent } from './components/template/tela/tela.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { PecaComponent } from './components/template/peca/peca.component';
import { PlacarComponent } from './components/template/placar/placar.component';
import { Placar2Component, Safe } from './components/template/placar2/placar2.component';
import { Pagina } from './components/template/placar/paginas';


@NgModule({
  declarations: [
    AppComponent,
    TelaComponent,
    PecaComponent,
    PlacarComponent,
    Placar2Component,
    Pagina,
    Safe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule
    // Peca
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
