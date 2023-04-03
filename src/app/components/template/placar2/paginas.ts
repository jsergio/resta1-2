const pg0:string =
`<div>    
<div class="orienta">
 <h2 style="text-align: center">
    Para Jogar:
 </h2>
  <br>
  <h3>
     <h3 style="text-align: left">
     Pecisa de Dois Cliques !
  </h3>
         <p style="text-align:left">
           Passo 1 - Clicar na pe&ccedil;a para marcar,
          </p>
         <p style="text-align:left">
           Passo 2 - Clicar no destino
         </p>
         <p>
         <br>
         Mais .. - 
         

                          
         </p>
         
 </h3>
 </div>
 
</div>
<button (click)="this.pagina()">Clique aqui</button>
` 
const  pg1:string =     `
Pagina 2
<div class="conteudo">

  <div class="orienta">
   <h2 style="text-align: center">
      Em meio ao jogo:
   </h2>
    <br>
    <h3>
       <h3 style="text-align: center">
       Setas do teclado, produsem efeito:
      </h3>
           <p>
             Seta esquerda : <-- anda uma jogada para traz,
            </p>
           <p>
           Seta direita : --> anda uma jogada para frente,
           </p>
           <p>
           Seta para cima : ^ anda todas as jogadas para frente,
           </p>
           <p>
           Seta para baixo :  anda todas as jogadas para traz,
           </p>
           <p>
           <br>
           Mais .. - 
           </p>
           
   </h3>
   </div>
   
</div>
<button (click)="this.pagina()">Clique aqui</button>
` 



export class Pagina{
  paginas:string[]=[]
  atual:number = 0

  constructor(){
     this.paginas=[pg0,pg1]
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

}
