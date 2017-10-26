import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aluno } from '../aluno';
import { Turma } from '../turma';
import { AlunoTurma } from '../alunoTurma';

@Component({
  selector: 'app-lista-turmas',
  templateUrl: './lista-turmas.component.html',
  styleUrls: ['./lista-turmas.component.css']
})
export class ListaTurmasComponent implements OnInit {
  @Input()
  turmas: Array<Turma>;

  @Output()
  onRegistrar = new EventEmitter<Turma>();

@Output()
onExcluir = new EventEmitter<Turma>();

 constructor() { }

 ngOnInit() {
 }
 registrarTurma(turma: Turma): void{
   this.onRegistrar.emit(turma);
 }

 excluirTurma(turma: Turma): void{
   this.onExcluir.emit(turma);
 }
}
