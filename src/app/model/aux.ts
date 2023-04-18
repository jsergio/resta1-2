// import { Pilha  } from "./pilha.service";

type DataType = 'esq' | 'dir' | 'cima' | 'baixo' | 'erro';
export interface Info {
    id?: number,
    direcao?: DataType
  }
    // const pp:Pilha = new Pilha()
    
    export const pp:Info[] = [
    {id: 40, direcao: 'esq'},
    {id: 41, direcao: 'baixo'},
    {id: 23, direcao: 'baixo'},
    {id: 5, direcao: 'dir'},
    {id: 32, direcao: 'cima'},
    {id: 14, direcao: 'cima'},
    {id: 23, direcao: 'baixo'},
    {id: 14, direcao: 'dir'},
    {id: 32, direcao: 'baixo'},
    {id: 23, direcao: 'dir'},
    {id: 41, direcao: 'baixo'},
    {id: 32, direcao: 'esq'},
    {id: 34, direcao: 'cima'},
    {id: 33, direcao: 'esq'},
    {id: 35, direcao: 'cima'},
    {id: 34, direcao: 'dir'},
    {id: 33, direcao: 'esq'},
    {id: 32, direcao: 'dir'},
    {id: 31, direcao: 'esq'},
    {id: 42, direcao: 'dir'},
    {id: 33, direcao: 'cima'},
    {id: 30, direcao: 'dir'},
    {id: 32, direcao: 'dir'},
    {id: 31, direcao: 'esq'},
    {id: 40, direcao: 'cima'},
    {id: 49, direcao: 'baixo'},
    {id: 28, direcao: 'cima'},
    {id: 29, direcao: 'dir'},
    {id: 27, direcao: 'cima'},
    {id: 30, direcao: 'cima'},
    {id: 28, direcao: 'esq'},
    {id: 29, direcao: 'dir'},
    {id: 48, direcao: 'cima'},
    {id: 46, direcao: 'esq'},
    {id: 47, direcao: 'baixo'},
    {id: 48, direcao: 'dir'},
    {id: 50, direcao: 'dir'},
    {id: 41, direcao: 'cima'},
    {id: 66, direcao: 'esq'},
    {id: 57, direcao: 'cima'},
    {id: 75, direcao: 'esq'}
  ]
  