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
    if(this.pilha.length === 0) 
      return
    
      while(this.pilha.length>0)
         this.pilha.pop()
  }

  invertePilha(): void {
    
    if (this.tamanho() === 0)
     {
      console.log('PILHA VAZIA')
      return
    }
    let tt: Info | undefined
    let tmpInfo: Info[] = []

    while ((tt = this.pilha.shift())) {
      if(tt !== undefined)
      tmpInfo.push(tt)
    }
    this.cp(tmpInfo)
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
