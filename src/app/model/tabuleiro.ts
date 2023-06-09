import { Peca } from "./peca";

type DataType = 'esq' | 'dir' | 'cima' | 'baixo' | 'erro';

const fesq = (l: number, c: number) => {
  return l * 9 + c + 1
}
const fdir = (l: number, c: number) => {
  return l * 9 + c - 1
}
const fcima = (l: number, c: number) => {
  return (l + 1) * 9 + c
}
const fbaixo = (l: number, c: number) => {
  return (l - 1) * 9 + c
}

const getDataSelector: Record<DataType, (l: number, c: number) => number> = {
  'esq': fesq,
  'dir': fdir,
  'cima': fcima,
  'baixo': fbaixo,
  'erro': fbaixo
}

function dataHandlerFunction(dd: DataType, l: number, c: number): number {
  return getDataSelector[dd](l, c);
}
export class Tabuleiro {

  tab: Peca[] = []
  vddTab: Peca[]
  marcado: Peca

  constructor() {
    this.geraTab()
    this.vddTab = this.pegaVdd()
    this.marcado = new Peca()
    // console.log('VDD ',this.vddTab)
  }

  strpeca: string = 'assets/img/peca1C.png'
  strvazio: string = 'assets/img/pecax2.png'

  pegaVdd(): Peca[] {
    const tmp: Peca[] =
      this.tab.filter(el => { return !this.inTab({ i: el.id }) })
    return tmp
  }


  jogavel(i: number): Peca[] {
    const obj: Peca = this.tab[i]

    if (obj.estado > 1)
      return []
    // os elementos de tmp distam de obj 2, sao buraco e o vizinho eh peca
    let tmp: Peca[] =
      this.tab.filter(
        (element) => {
          const direcao: DataType = this.getDir({ num1: element.id, num2: i })
          const d1: number = this.distancia({ p1: obj, p2: element })
          const d2: number = element.estado

          const viz: Peca = this.vizinho({ dd: direcao, obj: element })
          return (d1 === 2) && (d2 === 2) && (viz.estado < 2)//return do filter!!!
        })
    // console.log('JOGAVEL VDD 1', tmp);

    return tmp //esse return eh de jogavel()
  }


  vizinho({ dd, obj }: { dd: DataType, obj: Peca }): Peca {

    const l: number = this.linha({ i: obj.id })
    const c: number = this.col({ i: obj.id })
    const x: number = dataHandlerFunction(dd, l, c) //isto substitui o switch

    return this.tab[x]
  }

  desjoga2({ dd, obj, i }: { dd: DataType, obj: Peca, i: number }): void {
    const tmp1: Peca = this.vizinho({ dd, obj }) //pode ser direita,esquerda ....
    const tmp2: Peca = this.vizinho({ dd, obj: tmp1 }) //vizinho do vizinho
    this.poepeca({ obj: tmp1, i: 1 - i }) //O terceiro parametro diz se joga ou desjoga
    this.poepeca({ obj: tmp2, i: 1 - i })
  }

  mova({ l, c, dd }: { l: number, c: number, dd: DataType }): void {

    const x: number = dataHandlerFunction(dd, l, c)   //objCoord[dd](l, c)

    this.tab[x].estado = 2  //o vizinho se torna buraco
    this.tab[x].url = this.strvazio
  }

  geraTab(): void {
    const tmp: Peca[] = [] //Array de pecas

    for (let i = 0; i < 81; i++) {

      const obj: Peca = new Peca(i, this.strpeca, 0, this.inTab({ i }) ? 3 : 0, false)

      tmp.push(obj)
    }
    //centro do tabuleiro 
    tmp[40].url = this.strvazio
    tmp[40].estado = 2 //buraco
    this.tab = tmp
  }

  linha({ i }: { i: number; }): number {
    return Math.floor(i / 9)
  }

  col({ i }: { i: number; }): number {
    return i % 9
  }

  inTab({ i }: { i: number; }): boolean {
    const lin: number = this.linha({ i })
    const col: number = this.col({ i })

    return (lin < 3 || lin > 5) && (col < 3 || col > 5)
  }

  mesmaLinha({ num1, num2 }: { num1: number; num2: number; }): boolean {
    return this.linha({ i: num1 }) === this.linha({ i: num2 })
  }

  mesmaCol({ num1, num2 }: { num1: number; num2: number; }): boolean {
    return this.col({ i: num1 }) === this.col({ i: num2 })
  }

  getDir({ num1, num2 }: { num1: number; num2: number; }): DataType {
    if (this.mesmaLinha({ num1, num2 })) {
      {
        if (num1 < num2)
          return 'esq'
        else
          if (num1 > num2)
            return 'dir'
      }
    } else
      if (this.mesmaCol({ num1, num2 })) {
        // {
        if (num1 < num2)
          return 'cima'
        else
          if (num1 > num2)
            return 'baixo'
      }
    return 'erro'
  }

  distancia({ p1, p2 }: { p1: Peca; p2: Peca; }): number {
    const l1: number = this.linha({ i: p1.id })
    const l2: number = this.linha({ i: p2.id })
    const c1: number = this.col({ i: p1.id })
    const c2: number = this.col({ i: p2.id })

    if (l1 === l2)
      return Math.abs(c1 - c2)

    if (c1 === c2)
      return Math.abs(l1 - l2)

    return -1
  }

  marca({ obj }: { obj: Peca; }): void {
    if (obj.id != this.marcado.id) //Se obj eh diferente de marcado
    {
      this.marcado.stat = 0 //dismarca o marcado
      this.marcado.borda = false
    }
    if (obj.stat == 0) { //Se o obj nao esta marcado
      obj.stat = 1  //Marca obj
      obj.borda = true
      this.marcado = obj //coloca obj no ludar do marcado e sai
      return
    } else { //dismarca obj

      obj.stat = 0  //Nesse caso obj esta ja marcado pois stat eh diferente de 0 
      obj.borda = false
      obj.corBorda = 'nada'
    }
  }
  emcima({ obj }: { obj: Peca; }): boolean { //O objeto eh marcavel por cima
    const lin: number = obj.linha() //Math.floor(ind / 9)
    const col: number = obj.col()   //ind % 9

    return (lin > 1) && (this.tab[(lin - 1) * 9 + col].estado === 0)
      && (this.tab[(lin - 2) * 9 + col].estado === 2)
  }

  embaixo({ obj }: { obj: Peca; }): boolean { //O objeto eh marcavel por baixo
    const lin: number = obj.linha() //Math.floor(ind / 9)
    const col: number = obj.col()   //ind % 9

    return (lin < 7) && (this.tab[(lin + 1) * 9 + col].estado === 0)
      && (this.tab[(lin + 2) * 9 + col].estado === 2)

  }

  aesquerda({ obj }: { obj: Peca; }): boolean { //O objeto eh marcavel aesquerda
    const lin: number = obj.linha()  //Math.floor(ind / 9)
    const col: number = obj.col()    //ind % 9

    return (col > 1) && (this.tab[lin * 9 + (col - 1)].estado === 0)
      && (this.tab[lin * 9 + (col - 2)].estado === 2)

  }

  adireita({ obj }: { obj: Peca; }): boolean { //O objeto eh marcavel direita
    const lin: number = obj.linha()   //Math.floor(ind / 9)
    const col: number = obj.col()     //ind % 9

    return (col < 7) && (this.tab[lin * 9 + (col + 1)].estado === 0)
      && (this.tab[lin * 9 + (col + 2)].estado === 2)
  }

  marcavel({ obj }: { obj: Peca }): boolean {
    const result: boolean = this.aesquerda({ obj }) || this.adireita({ obj }) || this.emcima({ obj }) || this.embaixo({ obj })
    const cond: boolean = ((obj.stat === 0) && (obj.estado === 0))
    return result && cond
  }

  poepeca({ obj, i = 0 }: { obj: Peca; i?: number; }): void { // i igual 0 buraco i igual 1 peca
    obj.stat = 0   //garante dismarcado
    if (i === 1) {
      obj.estado = 0   // Peca ativa
      obj.url = this.strpeca
    } else {
      obj.estado = 2 //peca buraco
      obj.url = this.strvazio
    }
    return
  }
}