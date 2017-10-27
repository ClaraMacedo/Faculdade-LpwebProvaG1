import { Aluno } from './aluno';
export class Turma{
    numeroTurma: number = null;
    nome: string;
    alunos: Array<Aluno>;

    constructor(numeroTurma: number, nome: string, alunos?: Array<Aluno>) {
       this.numeroTurma = numeroTurma;
       this.nome = nome;
       this.alunos = alunos;
    }
}
