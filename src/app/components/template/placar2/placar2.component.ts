import { Component, Pipe, OnInit  } from '@angular/core';
import { JogoService } from '../../services/jogo.service';
import { Pagina } from './paginas';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({name: 'safeHtml'})



export class Safe {
  constructor(private sanitizer: DomSanitizer){}
  transform(html:string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@Component({
  selector: 'app-placar2',
  templateUrl: './placar2.component.html',
  styleUrls: ['./placar2.component.css']
})

export class Placar2Component implements OnInit{
  pg: Pagina = new Pagina
  
  constructor(public srv:JogoService) { }

  
  templateForm(value: string) {
    this.pg.atual = Number(value)-1
    this.srv.menssagem = this.pg.paginas[this.pg.atual]
  }

  ngOnInit(): void {
    const tt:string = this.pg.paginas[this.pg.atual]
    this.srv.menssagem = tt
  }
  
  pagina():void{
      this.pg.proximaPg()
      this.srv.menssagem =  this.pg.paginas[this.pg.atual] //this.pg.pegaMenssagem() 
    }  
  } 