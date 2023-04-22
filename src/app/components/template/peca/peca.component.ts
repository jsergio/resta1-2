import { Peca } from 'src/app/model/peca';
import { JogoService } from './../../services/jogo.service';
import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-peca',
  templateUrl: './peca.component.html',
  styleUrls: ['./peca.component.css']
})

export class PecaComponent implements OnInit {

    @Input() obj: Peca= new Peca(0,this.srv.strpeca,0,0,false)
    @Input() linha: number=this.obj.linha()
    @Input() coluna: number=this.obj.col()
    
  est:number[]=[]
  
  constructor(public srv:JogoService) { }
 
  ngOnInit(): void {}
}
