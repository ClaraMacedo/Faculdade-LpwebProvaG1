import { Component, OnInit } from '@angular/core';
import { Aluno } from './aluno';
import { Turma } from './turma';
import { AlunoTurma } from './alunoTurma';
import '../assets/css/style.css';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    alunos: Array<Aluno>;
    turmas: Array<Turma>;
    alunoTurma: Array<AlunoTurma>;
    novoAluno: Aluno = new Aluno(null, '');
    novaTurma: Turma = new Turma(null, '');
    novoAlunoTurma: AlunoTurma = new AlunoTurma( new Aluno(null, ''), new Turma(null, ''), null, null, null, null, null, null, "N/I");
    editando = false;
    mediando: number;
    cont= 0;
    mediaDaTurma: number;
    selecionado: Aluno;  
    numeroaluno: number = 3;

    constructor() {
        this.turmas =[
            new Turma(1, 'Ciências'),
            new Turma(2, 'Astro Física')
        ];
        this.alunos = [
            new Aluno(1, 'Carol Danvers'),
            new Aluno(2, 'Clint Barton'),
            new Aluno(3, 'Natasha Romanoff')
        ];
        this.alunoTurma=[
            new AlunoTurma( this.alunos[0], this.turmas[0],null, null, null, null, null, null, "N/I"),
            new AlunoTurma( this.alunos[1], this.turmas[1],null, null, null, null, null, null, "N/I"),
            new AlunoTurma( this.alunos[2], this.turmas[1],10, 10, 10, 10, null, null, "N/I")
        ]
    }

    ngOnInit(): void {
    }

    alunoSelecionado(aluno: Aluno): void {
        this.selecionado = aluno;
    }

    encontrarAluno(nome: string): number{
        console.log("encontrando...", nome);
        let indice = -1;
        for (let i=0; i< this.alunos.length; i++){
            if(this.alunos[i].nome == nome){
                indice = i;
                //i= this.vingadores.length;
                break;
            }
        }
        return indice;
    }

    encontrarTurma(id: number): number{
        console.log("encontrando...", id);
        let indice = -1;
        for (let i=0; i< this.turmas.length; i++){
            if(this.turmas[i].numeroTurma == id){
                indice = i;
                //i= this.vingadores.length;
                break;
            }
        }
        return indice;
    }

    encontrarAlunoTurma(alunoTurma: AlunoTurma): number{
        console.log("encontrando...", alunoTurma.aluno.nome);
        let indice = -1;
        for (let i=0; i< this.alunoTurma.length; i++){
            if(this.alunoTurma[i] == alunoTurma){
                indice = i;
                //i= this.vingadores.length;
                break;
            }
        }
        return indice;
    }

    cadastrar(): void {
        if(!this.editando){
            this.alunos.push(new Aluno(this.novoAluno.idAluno, this.novoAluno.nome));
            this.novoAluno = new Aluno(null, '');
            console.log("Com inclusão de alunos...");
        }
        else{
            this.novoAluno = new Aluno(null, '');
            this.editando = false;
            console.log("Sem inclusão de alunos...");
        }
        this.editando = true;
        this.cadastrarAlunoTurma();
        this.calcular();
        this.mostrarSituacao();
    }

    cadastrarTurma(): void{
        if(!this.editando){
            this.turmas.push(new Turma(this.novaTurma.numeroTurma, this.novaTurma.nome, this.novaTurma.alunos));
            this.novaTurma = new Turma(null, '');
            console.log("Com inclusão de turmas...");
        }
        else{
            this.turmas.push(new Turma(this.novaTurma.numeroTurma, this.novaTurma.nome, this.novaTurma.alunos));
            this.editando = false;
            console.log("Sem inclusão de turmas...");
        }
        this.editando = true;
        this.calcular();
        this.mostrarSituacao();
    }
    cadastrarAlunoTurma():void {
        if(!this.editando){
            this.alunoTurma.push(new AlunoTurma(this.novoAlunoTurma.aluno, this.novoAlunoTurma.turma, this.novoAlunoTurma.bim1, this.novoAlunoTurma.bim2, this.novoAlunoTurma.bim3, this.novoAlunoTurma.bim4, this.novoAlunoTurma.media, this.novoAlunoTurma.frequencia, this.novoAlunoTurma.situacaoFinal))
            this.novoAlunoTurma = new AlunoTurma( new Aluno(null, ''), new Turma(null, ''), null, null, null, null, null, null, "N/I");
            console.log("Com inclusão de alunos na turma...");
        }
        else{
            this.novoAlunoTurma = new AlunoTurma( new Aluno(null, ''), new Turma(null, ''), null, null, null, null, null,null, "N/I");
            this.editando = false;
            console.log("Sem inclusão de alunos na turma...");
        }
        
        this.calcular();
        this.mostrarSituacao();
    }

    registrarAluno(alunoTurma: AlunoTurma): void{
        const indice = this.encontrarAlunoTurma(alunoTurma);
        const indice1 = this.encontrarAluno(alunoTurma.aluno.nome);
        if(indice !== -1){
            this.novoAlunoTurma = this.alunoTurma[indice];
            this.novoAluno = this.alunos[indice1];
            this.editando = true;
            console.log("Registrar...");
        }
    }

    registrarTurma(turma: Turma): void{
        const indice = this.encontrarTurma(turma.numeroTurma);
        if(indice !== -1){
            this.novaTurma = this.turmas[indice];
            this.editando = true;
            console.log("Registrar...");
        }
    }
    
    calcular(): void{
        let indice = -1;
        let mediaTurma =0;
        let contando = 0;
        let cont = 0;
        let mediando = 0;
        var resum:number = 0;
        var sum = (number1: number, number2: number) =>  number1 + number2;
        var todasNotas=[];

        for (let i=0; i< this.alunoTurma.length; i++){
            if(this.alunoTurma[i].bim1 == null && this.alunoTurma[i].bim2 == null && this.alunoTurma[i].bim3 == null && this.alunoTurma[i].bim4 == null){
                this.alunoTurma[i].media = null;
                if(this.alunoTurma[i].frequencia == null){
                    this.alunoTurma[i].situacaoFinal = 'N/I';
                }
            }
            else{
                todasNotas = [this.alunoTurma[i].bim1, this.alunoTurma[i].bim2,this.alunoTurma[i].bim3, this.alunoTurma[i].bim4];
                for(let nota of todasNotas){
                    if(nota != null || nota == 0){
                        resum = sum(nota.valueOf() , resum);
                        cont += 1;
                    }

                }
                this.alunoTurma[i].media = resum/cont;
                mediaTurma+= this.alunoTurma[i].media;
                
                console.log("Calculando media aluno...", this.alunoTurma[i].media, mediaTurma);
            }
            todasNotas=[]                
            contando +=1;
            mediando = 0;
            cont = 0;
            resum = 0;    
            console.log("Calculando...");
        }
        this.mediaDaTurma = mediaTurma/contando;
        console.log("Calculando media turma...", this.mediaDaTurma);           
        this.mostrarSituacao();
    }

    mostrarSituacao(): void{
        for (let i=0; i< this.alunoTurma.length; i++){
            const fre = 200;
            if(this.alunoTurma[i].frequencia <= (fre * 75/100) && this.alunoTurma[i].frequencia != null){
                this.alunoTurma[i].situacaoFinal= "REPROVADO POR FALTA";
                this.alunoTurma[i].cor="table-danger";
            }
            else{
                if(this.alunoTurma[i].media >= 7){
                this.alunoTurma[i].situacaoFinal= "APROVADO";
                this.alunoTurma[i].cor="table-success";
                }
                else{
                    if(this.alunoTurma[i].media < 7 && this.alunoTurma[i].media != null)
                    {
                     this.alunoTurma[i].situacaoFinal= "REPROVADO";
                     this.alunoTurma[i].cor="table-danger";
                    }
                    else{
                        this.alunoTurma[i].situacaoFinal= "N/I";
                    }
                }
            }
            console.log("mostrarSituação...");  
            
        }
    }

}
