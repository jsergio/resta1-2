import { Injectable } from '@angular/core';
import { Info } from './aux';

@Injectable({
  providedIn: 'root'
})

export class Pilha {
  pilha: Info[];

  constructor() { 
    this.pilha = [] 
  }

  secapilha(): void {
    if(this.pilha,length == 0) return
    // for(let i=0;(this.pilha.length>0) && (i  < 45) ;i++){
      while(this.pilha)
         this.pilha.pop()
    // console.log("SECOU PILHA",this.pilha)
  }

  invertePilha(): void {
    
    if (this.tamanho() === 0)
     {
      console.log('PILHA VAZIA')
      return
    }
    // const tmpPilha:Pilha = new Pilha
    let tt: Info | undefined
    // const tmp: Info[] = []
    let tmpInfo: Info[] = []

    while ((tt = this.pilha.shift())) {
      if(tt !== undefined)
      tmpInfo.push(tt)
    }
    // console.log("INVERT TMP",tmp)
    this.cp(tmpInfo)
    console.log("INVERT PILHA ",this.pilha)
  }

  cp(p1: Info[]): void { //copia Info[] para this.pilha perdendo seu valor antigo
    this.secapilha() //seca this.pilha
    for (let i = 0; i < p1.length; i++) {
      this.pilha.unshift(p1[i])   //empilha p1[i] 
    }
    console.log('PILHA CORRENTE',this.pilha)
    return
  }

  tamanho(): number {
    return this.pilha.length
  }
}
