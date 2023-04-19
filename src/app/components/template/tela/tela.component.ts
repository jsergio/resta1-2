import { Peca } from 'src/app/model/peca';
import { JogoService } from '../../services/jogo.service';
import { Component, OnInit } from '@angular/core';
import { Tabuleiro } from 'src/app/model/tabuleiro';

export const sleep = async (waitTime: number) =>
  new Promise(resolve => setTimeout(resolve, waitTime));

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.css']
})

export class TelaComponent implements OnInit {

  indice: number = -1

  constructor(public srv: JogoService) { }

  onclick(ind: number) {
    this.srv.jogada(ind)
  }

  onkeydown(e: KeyboardEvent): void {
    //console.log(e.code)
    if (e.code === 'ArrowLeft') {
      // this.srv.menssagem = '<h2>Digitei ArrowLeft</h2>'
      this.srv.desjoga(0) //Mesmo que joga de fato i == 0
    }
    if (e.code === 'ArrowRight') {
      // this.srv.menssagem = '<h2>Digitei ArrowRight</h2>'
      this.srv.desjoga(1) //Mesmo que desjoga de fato i == 1
    }
    if (e.code === 'ArrowUp') {
      //  this.srv.menssagem = '<h2>Digitei ArrowUp</h2>'
      this.srv.iniciojogo(1) //Usa toda pilha salva
    }
    if (e.code === 'ArrowDown') {
      // this.srv.menssagem = '<h2>Digitei ArrowDown</h2>'
      this.srv.iniciojogo(0)  //Arma tabuleiro inicial. Inicio  de fato.  
    }
    if (e.code === 'Digit0') {

      // this.srv.menssagem = '<h2>Digitei Digit0</h2>'
      this.srv.pegamelhor() //Pega melhor jogada   
    }
    if (e.code === 'Digit1') {
      // this.srv.menssagem = '<h2>Digitei Digit1</h2>'
      this.srv.pegaUltima() //Pega ultimo Jogo.
      //console.log('Muito Bom',this.srv.pilhajogadas)
    }
    if (e.code === 'KeyR') {
      // this.srv.menssagem = '<h2>Digitei Digit1</h2>'
      this.srv.pilhajogadas.secapilha()
      this.srv.pilhasalvas.secapilha()
      this.srv.pilhamelhor.secapilha()
      this.srv.iniciatudo() //reinica Jogo
      //console.log('Muito Bom',this.srv.pilhajogadas)
    }
  }

  onout(i: number) {
    const euObj: Peca = this.srv.tabuleiro.tab[i]

    if ((euObj.borda === true) && (euObj.stat !== 1)) {
      euObj.borda = false
      euObj.corBorda = 'nada'
    }
  }
  onrover(i: number) {
    type Func = (p: Peca[]) => void
    const linkTab: Tabuleiro = this.srv.tabuleiro
    const euObj: Peca = linkTab.tab[i]
    this.indice = i;
    const tmp: Peca[] = linkTab.jogavel(i)

    const botaborda: Func = (tmp: Peca[]) => {
      this.srv.tiramarcas()
      tmp.forEach((element) => {
        // const flag:boolean = (element.stat == 0) //nao foi marcado
        if (element.borda === false) {
          element.borda = true
          element.corBorda = 'amarelo'
        }
      })
    }
    
    const waitSeconds: (ms: number, fp: Func) => void = async (ms: number, fp: Func) => {
      fp(tmp)
      await sleep(ms);
      this.srv.tiramarcas()
      return
    }
    
    if ((euObj.estado < 2) && (linkTab.marcavel({ obj: euObj }))) {

      this.srv.tiramarcas()
      if (linkTab.marcavel({ obj: euObj })) {
        euObj.borda = true
        waitSeconds(5000, botaborda)
      }

      const dd: number = linkTab.distancia({ p1: euObj, p2: linkTab.marcado })
      
      if ((euObj.estado === 2) && (dd === 2)) {
        // console.log('EMTROU 1 AQUI', euObj)
        if (this.srv.tabuleiro.marcado.borda) {
          // console.log('EMTROU 2 AQUI')
          euObj.borda = true
          euObj.stat = 0
          euObj.corBorda = 'nada'
        }
      }
    }
  }

  ngOnInit(): void {
    document.addEventListener('keydown', ev => this.onkeydown(ev))
    this.srv.iniciar()
  }
}