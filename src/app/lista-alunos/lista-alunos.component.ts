import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aluno } from '../aluno';
import { Turma } from '../turma';
import { AlunoTurma } from '../alunoTurma';

@Component({
  selector: 'app-lista-alunos',
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.css']
})
export class ListaAlunosComponent implements OnInit {

  @Input()
  alunoTurma: Array<AlunoTurma>; 

  @Input()
  turma: Turma;

 @Output()
   onRegistrar = new EventEmitter<AlunoTurma>();

@Output()
   onExcluir = new EventEmitter<AlunoTurma>();

  constructor() { }

  ngOnInit() {
  }
  registrarAluno(aluno: AlunoTurma): void{
    this.onRegistrar.emit(aluno);
  }

  excluirAluno(aluno: AlunoTurma): void{
    this.onExcluir.emit(aluno);
  }
}
