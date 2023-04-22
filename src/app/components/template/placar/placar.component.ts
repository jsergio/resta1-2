import { JogoService } from './../../services/jogo.service';
import { Component, OnInit } from '@angular/core';
import { Pagina } from './paginas';

@Component({
  selector: 'app-placar',
  templateUrl: './placar.component.html',
  styleUrls: ['./placar.component.css']
})
export class PlacarComponent implements OnInit {

  constructor(public srv:JogoService) { }
  
  // pg: Pagina = new Pagina(this.srv)
  // nPecas: number = this.srv.numpecas
  // mess: string = this.pg.paginas[this.pg.atual]
  // numPG: number = 1  

  ngOnInit(): void {}
  //   this.pg.atual = 0
  // }
  // pagina():void{
  //   if(this.pg.atual === 0){
  //     this.pg.paginas[0] = 
  //     this.srv.menssagem = this.pg.paginas[this.pg.atual] //this.pg.pegaMenssagem() 
  //   } else {
  //     this.pg.atual = 0
  //     this.srv.menssagem = this.pg.paginas[this.pg.atual] //this.pg.pegaMenssagem() 
  //   }
  //  } 
  }
