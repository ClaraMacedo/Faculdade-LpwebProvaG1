import { Aluno } from './aluno';
import { Turma } from './turma';

export class AlunoTurma {
    aluno: Aluno;
    turma: Turma;
    bim1: number;
    bim2: number;
    bim3: number;
    bim4: number;
    media: number;
    frequencia: number;
    situacaoFinal: string;
    cor: string;

    constructor( aluno: Aluno, turma: Turma, bim1: number, bim2: number, bim3: number, bim4: number, media?: number, frequencia?: number, situacaoFinal?: string, cor?: string) {
        this.aluno = aluno;
        this.turma = turma;
        this.bim1 = bim1;
        this.bim2 = bim2;
        this.bim3 = bim3;
        this.bim4 = bim4;
        this.media = media;
        this.frequencia = frequencia;
        this.situacaoFinal = situacaoFinal;
        this.cor = cor;
    }
}