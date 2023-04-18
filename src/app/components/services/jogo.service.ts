import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Peca } from 'src/app/model/peca';
import { Info, pp } from 'src/app/model/aux';
import { Tabuleiro } from 'src/app/model/tabuleiro';
import { Pilha } from 'src/app/model/pilha.service';
// import { log } from 'console';

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
  // jogaveis: Peca[] = []

  pilhajogadas: Pilha = new Pilha
  pilhasalvas: Pilha = new Pilha
  pilhamelhor: Pilha = new Pilha

  melhor: number = 44


  // pilhamelhor = pp //definido no arquivo aux.ts na pasta model.
  constructor(private stg: StorageService) {
    this.pilhamelhor.cp(pp)
    console.log('PILHA MELHOR',this.pilhamelhor.pilha);
    
    this.pilhamelhor.invertePilha()
    console.log('PILHA MELHOR INVERTIDA',this.tabuleiro);
  }

  tiramarcas(): void {
    this.tabuleiro.vddTab.forEach((element) => {
      if (element.estado === 2) {
        element.borda = false
        element.stat = 0
        element.corBorda = 'nada'
      }
    })
    // this.jogaveis = []
    return
  }


  pegaUltima(): void {
    // let tmp:any[]=[]
    // let tmp2: Info[] = []

    // tmp2:Pilha = new Pilha
    let tmp0: Info[] = []

    // this.menssagem = ''

    if (tmp0 = this.stg.get('UltimoJogo')) {
      // let tt: Info | undefined;
      // while (tmp0) {
      //   tt = tmp0.pop()
      //   if (tt !== undefined)
      //     this.pilhasalvas.pilha.push(tt)
      // }
      this.pilhasalvas.cp(tmp0)
      console.log('PILHA ULTIMO JOGO',this.pilhasalvas);
      
      this.numpecas = 44
      this.menssagem = '<h2> Tudo bem </h2> '
      this.menssagem += '<h2> Peguei Ultima </h2>'
    }
    // else {  
    //   this.pilhasalvas=[]
    //   console.log('Problemas ')
    // // this.copiapilha(this.pilhamelhor,this.pilhasalvas)
    // }
    //  this.menssagem += '  '+ this.numpecas
    else {
      this.menssagem = '<h2> Nada de Ultim0Jogo </h2>'
    }
    return
  }




  iniciar(): void {
    // if (this.melhor = this.stg.get('melhorresta')) { }
    //else 
    {
      this.melhor = 20 //numero chutado
    }
    this.numpecas = 44
    this.dizFase = 'inicio'
    return
  }

  mudaFase(p: FaseJogo): void {
    if (p === 'inicio')
      this.dizFase = 'meio'
    else {
      if (this.terminou)
        this.dizFase = 'fim'
      else
        this.dizFase = 'meio'
    }
  }
  
  escolhepilha(i: number) {
    if (i === 0)
      return [this.pilhajogadas, this.pilhasalvas]
    else
      if (i === 1)
        return [this.pilhasalvas, this.pilhajogadas]
      else
        return []
  }


  
  iniciojogo(i: number): void {
    //  i = i
    if (i === 1) {
      // console.log('Pilha Tamanho',this.pilhasalvas.length)
      while (this.pilhasalvas.tamanho() > 0)
        this.desjoga(1)
    } else {
      while (this.pilhajogadas.tamanho() > 0)
        this.desjoga(0)
    }
    // this.pilhajogadas.secapilha()
    // this.pilhasalvas.secapilha()
    this.numpecas = 44
    this.terminou = false
    this.melhor = this.stg.get('melhorresta')
    this.dizFase = 'inicio'
  }

  pegamelhor(): void {

    console.log('PILHA MELHOR ANTES INVERTERA', this.pilhasalvas)
    this.pilhasalvas.cp(this.pilhamelhor.pilha)
    // console.log('PILHASALVA  FINAL ', this.pilhasalvas)
    this.numpecas = 44
    return
  }

  checatermino(): void {

    if (this.numpecas < 10) {
      this.terminou = !this.veseterminou()
      // console.log('ENTROU', this.terminou, 'MELHOR', this.melhor)
      if (this.terminou) {
        // if(this.numpecas<=this.melhor)
        {
          // console.log('ENTROU1', this.terminou, 'MELHOR', this.melhor)
          this.dizFase = 'fim'
          this.melhor = this.numpecas
          this.menssagem += `<p>FIM</p>`
          // console.log('PILHA GRAVADA',this.pilhajogadas)
          
          this.gravapilha(this.pilhajogadas.pilha)``
          // this.copiapilha(this.pilhasalvas,this.pilhamelhor)
          // this.gravapilha(this.pilhajogadas) //pilhajogadas contem Info das jogadas dadas
        }
      }
    }
    // return
  }

  desjoga(i: number) { //i igual a 0 desjoga; i igual a 1 joga
    const p1: Pilha = this.escolhepilha(i)[0]//(i===0)?this.pilhajogadas:this.pilhasalvas
    const p2: Pilha = this.escolhepilha(i)[1]  //(i===0)?this.pilhasalvas:this.pilhajogadas
    //as pilhas conteem {objeto,direcao} para desfazer
    if (p1.tamanho() == 0)
      return
    else {
      // let obj: Peca
      const tmp: Info | undefined = p1.pilha.pop()  //Tira de p1
      if (tmp !== undefined)
        p2.pilha.push(tmp)        //e coloca em p2
      if (tmp?.id !== undefined && tmp.direcao !== undefined) {
        const direcao: DataType = tmp?.direcao
        const obj = this.tabuleiro.tab[tmp.id]

        this.tabuleiro.poepeca({ obj, i }) //acende ou torna buraco na posicao tmp.id
        this.tabuleiro.desjoga2({ dd: direcao, obj, i })//realisa para duas outras visinhas

        this.mudaFase(this.dizFase)
        if (i == 0) //se andou para traz
          this.numpecas++ //recupera numero de pecas
        else {
          this.numpecas-- //diminui numero de pecas
          this.checatermino() //ver se terminou
        }
      }
    }
  }

  veseterminou(): boolean {

    let result = false

    const tmp: Peca[] = this.tabuleiro.tab.filter(ele => ele.estado === 0)

    // this.pilhafiltrada = tmp

    tmp.forEach(
      ele => result = this.tabuleiro.marcavel({ obj: ele }) || result
    )
    //tmp.forEach igual a true se pelo menos um elemento de tmp 'eh marcavel
    //tmp.forEach eh falso se todos os elementos de tmp nao sao marcaveis
    // console.log('FALTAM AGORA', tmp, 'TAMANHO ', tmp.length, 'Result', result)
    this.menssagem = `<p>TAMANHO: ${tmp.length}</p> <p> RESULTADO ${result}</p>`
    return result
  }

  distancia(p1: Peca, p2: Peca): number {
    const l1: number = p1.linha()  //Math.floor(p1.id / 9)
    const l2: number = p2.linha()      //Math.floor(p2.id / 9)
    const c1: number = p1.col()     //p1.id % 9
    const c2: number = p2.col()    //p2.id % 9

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
    //essa cond diz que anterior esta marcado, eh buraco e distancia do marcado eh 2

    if (cond) {
      const dd: DataType = this.tabuleiro.getDir({ num1: obj.id, num2: this.tabuleiro.marcado.id })
      //dd eh a direcao entre obj e obj marcado, esquerda,direita,cima ou baixo
      const tmp: Info = { id: obj.id, direcao: dd }

      this.pilhasalvas.secapilha() //sempre que joga secapilha pilhasalvas

      this.pilhajogadas.pilha.push(tmp)

      obj.estado = 0 //Transforma buraco em peca
      obj.url = this.strpeca
      this.numpecas--

      this.tabuleiro.marcado.stat = 0  //dismarca marcado
      this.tabuleiro.marcado.borda = false

      this.tabuleiro.marcado.estado = 2  //transforma marcado em buraco
      this.tabuleiro.marcado.url = this.strvazio


      this.tabuleiro.mova({ l: lin, c: col, dd: dd }) //isso efetivamente realiza a jogada
      this.checatermino() //ver se jogo terminou
    }
    this.mudaFase(this.dizFase)
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
