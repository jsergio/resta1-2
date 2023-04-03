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
  
  pg: Pagina = new Pagina(this.srv)
  nPecas: number = this.srv.numpecas
  mess: string = this.pg.paginas[this.pg.atual]
  numPG: number = 1  

  ngOnInit(): void {
    // this.pg = new Pagina(this.srv)
    console.log('Obj Pagina',this.pg)
    this.pg.atual = 0
    // this.mess = this.pg.paginas[1]
    // this.srv.menssagem = this.pg.paginas[this.pg.atual]
  }
  pagina():void{
    // if(this.pg) 
    if(this.pg.atual === 0){
      // this.pg.proximaPg()
      this.pg.paginas[0] = 
      this.srv.menssagem = this.pg.paginas[this.pg.atual] //this.pg.pegaMenssagem() 
    
    }  else {
      this.pg.atual = 0
      this.srv.menssagem = this.pg.paginas[this.pg.atual] //this.pg.pegaMenssagem() 
    }
   } 
  }
