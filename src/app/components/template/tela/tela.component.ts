// import { StorageService } from './../../services/storage.service';
import { Peca } from 'src/app/model/peca';
import { JogoService } from '../../services/jogo.service';
import { Component, OnInit } from '@angular/core';
import { Tabuleiro } from 'src/app/model/tabuleiro';
// import { AnyRecord } from 'dns';


// Type Mobj = { obj:Peca }

// interface Mobj{obj?:Peca;}

// export interface Peca{
//   id?:number,
//   url:string,
//   stat:number,
//   estado:number,
//   borda:boolean
// }

// export enum KEY_CODE {
//   RIGHT_ARROW = 39,
//   LEFT_ARROW = 37
// }


@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.css']
})

export class TelaComponent implements OnInit {

  indice:number=-1
  xi: string[] = []
    
  constructor(public srv: JogoService) { }
  
  onclick(ind:number){
    this.srv.jogada(ind)
  }

 onkeydown(e:KeyboardEvent):void{
  //console.log(e.code)
  if(e.code==='ArrowLeft'){ 
    this.srv.menssagem = '<h2>Digitei ArrowLeft</h2>'
    this.srv.desjoga(0) //Mesmo que joga de fato i == 0
  }
  if(e.code==='ArrowRight'){  
    this.srv.menssagem = '<h2>Digitei ArrowRight</h2>'
    this.srv.desjoga(1) //Mesmo que desjoga de fato i == 1
  }
  if(e.code==='ArrowUp'){  
     this.srv.menssagem = '<h2>Digitei ArrowUp</h2>'
     this.srv.iniciojogo(1) //Usa toda pilha salva
  }
  if(e.code==='ArrowDown'){
    this.srv.menssagem = '<h2>Digitei ArrowDown</h2>'
    this.srv.iniciojogo(0)  //Arma tabuleiro inicial. Inicio  de fato.  
  }
  if(e.code==='Digit0'){

    this.srv.menssagem = '<h2>Digitei Digit0</h2>'
    this.srv.pegamelhor() //Pega melhor jogada   
  }
  if(e.code==='Digit1'){
    this.srv.menssagem = '<h2>Digitei Digit1</h2>'
    this.srv.pegaUltima() //Pega ultimo Jogo.
    //console.log('Muito Bom',this.srv.pilhajogadas)
  }
    // console.log('OK')
  // console.log('OK De Novo',e.code)
}
onout(i:number){
  const  euObj: Peca = this.srv.tabuleiro.tab[i]
  const flg: boolean = (euObj.stat === 0) //nao foi marcado
  if((euObj.borda === true) && flg)
     euObj.borda=false
}
onrover(i:number){
  
  // const tmpTab: Tabuleiro = this.srv.tabuleiro
  const  euObj: any = this.srv.tabuleiro.tab[i]
  // euObj.borda = false
  // // euObj.obj = this.srv.tabuleiro.tab[i]
 
  // if(tmpTab.marcavel(euObj)){
  //   alert(euObj) 
  //   tmpTab.marca(euObj)  
  //  }
  this.indice=i;
  if(this.srv.tabuleiro.marcavel({obj:euObj}))
     {
      var elemento = document.getElementById(this.xi[3])
      euObj.borda = true
      console.log('Elemento = ',elemento)
      if(elemento)
         elemento.style.border = '2pt solid blue'
      
    
    }
    // alert(JSON.stringify([euObj,typeof(euObj)]))
  // if(this.srv.tabuleiro.marcavel(euObj))
    //  alert(i)
}

ngOnInit(): void {
  // const cont=document.getElementsByName('cont')
  for(let i: number=0;i<81;i++){
    this.xi[i] = ''+i
  }
  document.addEventListener('keydown', ev => this.onkeydown(ev))
  this.srv.iniciar()
  // console.log(typeof(document),cont)
}
}
