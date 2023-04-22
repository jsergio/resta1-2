import { JogoService } from './../../services/jogo.service';
import { Component,OnInit } from '@angular/core';

@Component({
   template: '', 
})


export class Pagina implements OnInit{
  paginas:string[]=[]
  atual:number = 0
  nPecas:number = 0
  minhaMess = `Testando`
  constructor(public srv:JogoService) {
  this.paginas=[this.poePg()]
   }
poePg(): string{
    const pg0: string =
    `   <div class="conteudo">
        <h2 style="text-align: center">
            <p>
               Bem Vindo ao jogo
            </p>
            <p>
                Resta 1
            </p>
        </h2>
        <h2  style="text-align: center">
            Restam: ${this.srv.numpecas}   Pe&ccedil;as
        </h2>
    </div>`
    return pg0
}
proximaPg():void{this.atual++}
antPG(): void{
    if(this.atual===0)
         this.atual = 1
    else
         this.atual = this.atual--
    }
 pegaMenssagem():string{
    return this.paginas[this.atual]
 }   

ngOnInit(): void {
   this.nPecas = this.srv.numpecas   

   const pg0: string =
`   <div class="conteudo">
    <h2 style="text-align: center">
        <p>
           Bem Vindo ao jogo
        </p>
        <p>
            Resta 1
        </p>
    </h2>
    <h2  style="text-align: center">
        Restam: ${this.srv.numpecas}   Pe&ccedil;as
    </h2>
    <h2 *ngIf="this.srv.terminou">
        Terminou
    </h2>
</div>`
this.paginas.push(pg0)
this.paginas.push(`Segunda Pagina`)}
}
