export class Aluno {
    idAluno: number = null;
    nome: string;
    

    constructor( idAluno: number, nome: string) {
        this.idAluno = idAluno;
        this.nome = nome;
    }
}