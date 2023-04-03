export class Peca {
    id: number;    //Local no tabuleiro 9 x 9 
    url: string;   // url da imagem da peca
    stat: number;  // 1 marcado; 0 nao marcado
    estado: number; //0 ou 1 peca 2 buraco 3 fora do tabuleiro de jogo
    borda: boolean; // poe borda true ; sem borda false
    
      constructor (id:number=0,url:string='',stat:number=0,estado:number=0,borda:boolean=false){
        this.id = id
        this.url = url
        this.stat = stat
        this.estado = estado
        this.borda = borda
    }
    linha():number{
      return Math.floor(this.id/9)
    }
    
    col():number{
      return this.id%9
    }
}
