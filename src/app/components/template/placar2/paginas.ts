const pg0:string =
`<div>    
<div class="orienta">
 <h2 style="text-align: center">
    Para Jogar:
 </h2>
  <br>
  <h3>
     <h3 style="text-align: left">
     Precisa de Dois Cliques !
  </h3>
         <p style="text-align:left">
           Passo 1 - Clicar na pe&ccedil;a para marcar,
          </p>
         <p style="text-align:left">
           Passo 2 - Clicar no destino
         </p>
         <p>
         <br>
         Mais ..                           
         </p>
         
 </h3>
 </div>
 
</div>
<button (click)="this.pagina()">Clique aqui</button>
` 
const  pg1:string =
`
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
           Mais  
           </p>
           
   </h3>
   </div>
   
</div>
<button (click)="this.pagina()">Clique aqui</button>
`
const  pg2:string = 
`<div class="conteudo">

  <div class="orienta">
   <h2 style="text-align: center">
      No in&iacute;o do jogo:
   </h2>
   <br>
       Tecle 0 para pegar um <strong>jogo bom </strong>.  <br>
       ou<br>
       Tecle 1 para pegar <strng>&uacute;timo jogo jogado</strong>. 
       <br><br>Em seguida clique a seta direita  --> para jogar
   </div>
   
</div>
<button (click)="this.pagina()">Clique aqui</button>
`

export class Pagina{
  paginas:string[]=[]
  atual:number = 0

  constructor(){
     this.paginas=[pg0,pg1,pg2]
}

proximaPg():void{this.atual<2 ? this.atual++:this.atual=0 }

antPG(): void{
    (this.atual===0) ?this.atual = 2:this.atual-- }

 pegaMenssagem():string{
    return  this.paginas[this.atual]
 }   

}
