import { Component, Pipe, OnInit  } from '@angular/core';
// import { mixinDisableRipple } from '@angular/material/core';
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
  
  ngOnInit(): void {
    // this.pg = new Pagina
    // document..innerHTML =`<button class="tag" onclick="alert('Button Clicked!')">Text</button>`
    
    const tt:string = this.pg.paginas[this.pg.atual]

    this.srv.menssagem = tt
  
  }
 
  pagina():void{
    // const ultima = 2
    // if(this.pg){ 
    // if(this.pg.atual === 0){
      
      this.pg.proximaPg()
      this.srv.menssagem =  this.pg.paginas[this.pg.atual] //this.pg.pegaMenssagem() 

      // this.pg.atual++
    }  
    //  else {
      // this.srv.menssagem = `${this.pg.atual}` + this.pg.paginas[this.pg.atual] //this.pg.pegaMenssagem() 

    // } 
    // this.srv.menssagem = `${this.pg.atual}` + this.pg.paginas[this.pg.atual] //this.pg.pegaMenssagem() 
  } 
// }