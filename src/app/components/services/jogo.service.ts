import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Peca } from 'src/app/model/peca';
import { Info, pp } from 'src/app/model/aux';
import { Tabuleiro } from 'src/app/model/tabuleiro';
// import { type } from 'os';

/*
estado == 0 peca
estado == 1 peca
estado == 2 buraco
estado == 3 sem imgem
*/

type DataType = 'esq' | 'dir' | 'cima' | 'baixo' | 'erro';
type FaseJogo = 'inicio' | 'meio' | 'fim'

@Injectable({
  providedIn: 'root'
})

export class JogoService {

  dizFase: FaseJogo = 'inicio'

  tabuleiro: Tabuleiro = new Tabuleiro()

  menssagem = '<h2>Alo!</h2><h2>Tudo Bem?</h2><h2>Estou Aqui!para jogar!</h2>'
 
  //  '<h2>Alo!</h2><h2>Tudo Bem?</h2><h2>Estou Aqui!para jogar!</h2>'
  numpecas: number = 44
  direcao: string = 'nenhuma'
  strpeca: string = 'assets/img/peca1C.png'
  strvazio: string = 'assets/img/pecax2.png'
  terminou: boolean = false

  pilhajogadas: (Info | undefined)[] = [] //[{id:0,direcao:'nenhuma'}]
  pilhasalvas: (Info | undefined)[] = []

  melhor: number = 44

  pilhamelhor = pp //definido no arquivo aux.ts na pasta model.



  pegaUltima(): void {
    // let tmp:any[]=[]
    let tmp2: Info[] = []
    this.menssagem = ''
    this.menssagem = '<h2> Peguei Ultima </h2>'
    if (tmp2 = this.stg.get('UltimoJogo')) {
      // console.log('P = ',tmp2)
      // this.menssagem += "Ultima = "+JSON.stringify(tmp2) 
      if (tmp2) {
        {
          this.secapilha(this.pilhasalvas)
          while (tmp2.length > 0) {
            const tt: Info | undefined = tmp2.pop()
            tt !== undefined ? this.pilhasalvas.push(tt) : this.menssagem = 'Erro'
          }
          // console.log('Pegou ',this.pilhasalvas)
        }
        // else {  
        //   this.pilhasalvas=[]
        //   console.log('Problemas ')
        // // this.copiapilha(this.pilhamelhor,this.pilhasalvas)
        // }
        this.numpecas = 44
        this.menssagem = '<h2> Tudo bem </h2> ' + this.pilhasalvas.length
        //  this.menssagem += '  '+ this.numpecas
      }
    } else {
      this.menssagem = '<h2> Nada de Ultim0Jogo </h2>'
    }
    return
  }


  constructor(private stg: StorageService) { }

  iniciar() {
    if (this.melhor = this.stg.get('melhorresta')) { }
    else {
      this.melhor = 20 //numero chutado
    }
    this.numpecas = 44
    this.dizFase = 'inicio'  
  
  }

  mudaFase(p: FaseJogo ):void{
    if(p === 'inicio')
       this.dizFase = 'meio'
    else {
       if(this.terminou)
         this.dizFase = 'fim'
       else
         this.dizFase = 'meio'  
    }
  }
  ////////////////////////////////////////////////////////////

  // gravapilha(p:any):boolean{
  //   // const obj={"melhorjogo",p}
  //   if(this.stg.remove('melhorjogo')){
  //     console.log('MelhorJogo Removido!')
  //   }
  //   if(this.stg.remove('melhorresta')){
  //     console.log('Restamelhor Removido!')
  //   }

  //   if(this.stg.set('melhorjogo',p)){
  //     console.log('MelhorJogo',JSON.stringify(p),p.length)
  //     if(this.stg.set('melhorresta',this.melhor)){
  //       console.log('MelhorResta',this.melhor)
  //     }
  //     return true
  //   }
  //   return false
  // }





  escolhepilha(i: number) {
    if (i === 0)
      return [this.pilhajogadas, this.pilhasalvas]
    else
      if (i === 1)
        return [this.pilhasalvas, this.pilhajogadas]
      else
        return []
  }


  secapilha(p: any[]): void {
    while (p.length > 0)
      p.pop()
    return
  }

  iniciojogo(i: number): void {
    if (i === 1) {
      // console.log('Pilha Tamanho',this.pilhasalvas.length)
      while (this.pilhasalvas.length > 0)
        this.desjoga(1)
    } else {
      while (this.pilhajogadas.length > 0)
        this.desjoga(0)
      this.numpecas = 44
      this.terminou = false
      this.melhor = this.stg.get('melhorresta')
      this.dizFase = 'inicio'
    }
    // return
  }

  pegamelhor(): void {
    let tmp: Info[] = this.pilhamelhor
    // if(tmp=this.stg.get("melhorjogo"))
    {
      //  this.pilhasalvas=[]
      this.secapilha(this.pilhasalvas)
      while (tmp.length > 0) {
        this.pilhasalvas.push(tmp.pop())
      }
      console.log('Pegou ', this.pilhasalvas)
    }
    // else {  
    //   this.pilhasalvas=[]
    //   console.log('Problemas ')
    // // this.copiapilha(this.pilhamelhor,this.pilhasalvas)
    // }
    this.numpecas = 44
    return
  }

  checatermino(): void {

    if (this.numpecas < 10) {
      this.terminou = !this.veseterminou()
      console.log('ENTROU', this.terminou, 'MELHOR', this.melhor)
      if (this.terminou) {
        // if(this.numpecas<=this.melhor)
        { 
          console.log('ENTROU1', this.terminou, 'MELHOR', this.melhor)
          this.dizFase = 'fim'
          this.melhor = this.numpecas
          // this.copiapilha(this.pilhasalvas,this.pilhamelhor)
          this.gravapilha(this.pilhajogadas) //pilhajogadas contem Info das jogadas dadas
        }
      }
    }
    // return
  }

  desjoga(i: number) { //i igual a 0 desjoga; i igual a 1 joga
    const p1 = this.escolhepilha(i)[0]//(i===0)?this.pilhajogadas:this.pilhasalvas
    const p2 = this.escolhepilha(i)[1]  //(i===0)?this.pilhasalvas:this.pilhajogadas

    if (p1.length == 0)
      return
    else {
      let obj: Peca
      const tmp = p1.pop()  //Tira de p1
      p2.push(tmp)        //e coloca em p2
      if (tmp?.id !== undefined) {
        obj = this.tabuleiro.tab[tmp.id]
        this.tabuleiro.poepeca({ obj, i }) //acende ou torna buraco na posicao tmp.id

        //  console.log('Direcao',tmp.direcao)

        switch (tmp.direcao) {
          case 'esq':
            this.tabuleiro.poepeca({ obj: this.tabuleiro.tab[tmp.id + 1], i: 1 - i })
            this.tabuleiro.poepeca({ obj: this.tabuleiro.tab[tmp.id + 2], i: 1 - i })
            break
          case 'dir':
            this.tabuleiro.poepeca({ obj: this.tabuleiro.tab[tmp.id - 1], i: 1 - i })
            this.tabuleiro.poepeca({ obj: this.tabuleiro.tab[tmp.id - 2], i: 1 - i })
            break
          case 'cima':
            this.tabuleiro.poepeca({ obj: this.tabuleiro.tab[tmp.id + 9], i: 1 - i })
            this.tabuleiro.poepeca({ obj: this.tabuleiro.tab[tmp.id + 18], i: 1 - i })
            break
          case 'baixo':
            this.tabuleiro.poepeca({ obj: this.tabuleiro.tab[tmp.id - 9], i: 1 - i })
            this.tabuleiro.poepeca({ obj: this.tabuleiro.tab[tmp.id - 18], i: 1 - i })
            break
        }
        this.mudaFase(this.dizFase)
        if (i == 0)
          this.numpecas++
        else {
          this.numpecas--
          this.checatermino()
        }
      }
    }
  }

  veseterminou(): boolean {

    let result = false

    const tmp = this.tabuleiro.tab.filter(ele => ele.estado === 0)

    // this.pilhafiltrada = tmp

    tmp.forEach(
      ele => result = this.tabuleiro.marcavel({ obj: ele }) || result
    )
    console.log('FALTAM AGORA', tmp, 'TAMANHO ', tmp.length, 'Result', result)

    return result
  }

  distancia(p1: Peca, p2: Peca): number {
    const l1: number = Math.floor(p1.id / 9)
    const l2: number = Math.floor(p2.id / 9)
    const c1: number = p1.id % 9
    const c2: number = p2.id % 9

    if (l1 === l2)
      return Math.abs(c1 - c2)

    if (c1 === c2)
      return Math.abs(l1 - l2)

    return -1
  }

  joga(obj: Peca): void {

    const ind: number = obj.id
    const lin: number = this.tabuleiro.linha({ i: ind }) //)Math.floor(ind / 9)
    const col: number = this.tabuleiro.col({ i: ind }) //ind % 9

    // const indant: number = this.tabuleiro.marcado.id
    // const linant: number = this.tabuleiro.linha({ i: indant }) //Math.floor(indant / 9)
    // const colant: number = indant % 9

    const distancia: number = this.tabuleiro.distancia({ p1: obj, p2: this.tabuleiro.marcado })

    const cond: boolean = (this.tabuleiro.marcado.stat === 1) && (distancia === 2) && (obj.estado === 2)
    //obj anterior marcado e distancia ===2 e obj eh buraco
    // cond = cond && (obj.estado === 2)

    if (cond) { //&& ((lin === linant) || (col === colant))) { 
      //se eh um buraco e anterior marcado
      const dd: DataType = this.tabuleiro.getDir({ num1: obj.id, num2: this.tabuleiro.marcado.id })

      const tmp = { id: obj.id, direcao: dd }

      this.secapilha(this.pilhasalvas)

      this.pilhajogadas.push(tmp)

      obj.estado = 0
      obj.url = this.strpeca
      this.numpecas--

      this.tabuleiro.marcado.stat = 0  //dismarca marcado
      this.tabuleiro.marcado.borda = false

      this.tabuleiro.marcado.estado = 2  //transforma marcado em buraco
      this.tabuleiro.marcado.url = this.strvazio


      this.tabuleiro.mova({ l: lin, c: col, dd: dd })
      this.checatermino()
    }
    this.dizFase = 'meio'
  }


  jogada(ind: number): void {

    const obj: Peca = this.tabuleiro.tab[ind]

    if (obj.stat === 1) { //se ja foi marcada
      this.tabuleiro.marca({ obj })  //Dismarca
      return
    }

    if (this.tabuleiro.marcavel({ obj })) {
      this.tabuleiro.marca({ obj })
      // return
    } else {
         this.joga(obj)
      // return
    }
  }

  /*
  copiapilha(p1:any,p2:any){
    this.secapilha(p1)
    for(let i=0;i<p2.length();i++)
      p1.push(p2[i])
  }
*/


  gravapilha(p: any): any {
    // const obj={"melhorjogo",p}
    if (this.stg.remove('UltimoJogo')) {
      console.log('UltimoJogo Removido!')
    }
    if (this.stg.remove('melhorjogo')) {
      console.log('MelhorJogo Removido!')
    }
    if (this.stg.remove('melhorresta')) {
      console.log('Restamelhor Removido!')
    }
    if (this.stg.set('UltimoJogo', p)) {
      this.menssagem = '<h2>Gravado UltimoJogo</h2>'
      this.menssagem += "Gravado JSON.stringify(p)"
      console.log('UltimoJogo', JSON.stringify(p), p.length)
      if (this.stg.set('melhorresta', this.melhor)) {
        console.log('MelhorResta', this.melhor)
      }
      return true
    }
    return false
  }

}
