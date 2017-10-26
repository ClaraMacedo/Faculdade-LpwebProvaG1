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
    selecionadoT: Turma;  
    numeroaluno: number = 3;
    estahSelecionado: boolean = false;

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
        this.estahSelecionado = true;
        console.log("selecionado aluno...");
    }
    turmaSelecionada(turma: Turma): void {
        this.selecionadoT = turma;
        this.estahSelecionado = true;
        console.log("selecionada turma...");
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

    encontrarTurma(id?: number, nome?: string): number{
        console.log("encontrando...", id);
        let indice = -1;
        for (let i=0; i< this.turmas.length; i++){
            if(this.turmas[i].numeroTurma == id || this.turmas[i].nome == nome){
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
            const novoId: number = this.alunos.length + 1;
            this.alunos.push(new Aluno(novoId, this.novoAluno.nome));
            this.novoAluno = new Aluno(null, '');
            console.log("Com inclusão de alunos...");
        }
        else{
            const novoId: number = this.alunos.length + 1;
            this.novoAluno = new Aluno(novoId, '');
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
            const novoId: number = this.turmas.length + 1;
            this.turmas.push(new Turma(novoId, this.novaTurma.nome, this.novaTurma.alunos));
            this.novaTurma = new Turma(null, '');
            console.log("Com inclusão de turmas...");
        }
        else{
            const novoId: number = this.turmas.length + 1;
            this.turmas.push(new Turma(novoId, this.novaTurma.nome, this.novaTurma.alunos));
            this.editando = false;
            console.log("Sem inclusão de turmas...");
        }
        this.editando = true;
        
        this.mostrarSituacao();
    }
    cadastrarAlunoTurma(turma?:Turma, aluno?:Aluno):void {
        if(!this.editando){
            this.alunoTurma.push(new AlunoTurma(aluno? aluno:this.novoAlunoTurma.aluno, turma? turma :this.novoAlunoTurma.turma, this.novoAlunoTurma.bim1, this.novoAlunoTurma.bim2, this.novoAlunoTurma.bim3, this.novoAlunoTurma.bim4, this.novoAlunoTurma.media, this.novoAlunoTurma.frequencia, this.novoAlunoTurma.situacaoFinal))
            this.novoAlunoTurma = new AlunoTurma(  aluno? aluno:new Aluno(null, ''), turma? turma :new Turma(null, ''), null, null, null, null, null, null, "N/I");
            console.log("Com inclusão de alunos na turma...");
        }
        else{
            this.novoAlunoTurma = new AlunoTurma( new Aluno(null, ''), new Turma(null, ''), null, null, null, null, null,null, "N/I");
            this.editando = false;
            console.log("Sem inclusão de alunos na turma...");
        }
        
        this.mostrarSituacao();
    }

    
//
    //RegistarAlunoTurma(turma : string, aluno: string){
       // const indice = this.encontrarAluno(aluno);
        //const indice1 = this.encontrarTurma(null, turma);
       // if(indice !== -1){
         //   this.cadastrarAlunoTurma(this.turmas[indice1], this.alunos[indice]);
         //   this.editando = true;
         //   console.log("RegistrarAlunoNaTurma...");
        //}
   // }

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
        const indice = this.encontrarTurma(turma.numeroTurma, null);
        if(indice !== -1){
            this.novaTurma = this.turmas[indice];
            this.editando = true;
            console.log("Registrar...");
        }
    }

    excluirTurma(turma: Turma):void{
        const indice = this.encontrarTurma(turma.numeroTurma, null);
        if(indice !== -1){
            this.turmas.splice(indice, 1);
            this.novaTurma = new Turma(null, '');
        }
    }

    excluirAluno(aluno: AlunoTurma):void{
        const indice = this.encontrarAlunoTurma(aluno);
        const indice1 = this.encontrarAluno(aluno.aluno.nome);
        if(indice !== -1){
            this.alunoTurma.splice(indice, 1);
            this.alunos.splice(indice1, 1);
            this.novoAluno = new Aluno(null,'');
            this.novoAlunoTurma = new AlunoTurma( new Aluno(null, ''), new Turma(null, ''), null, null, null, null, null, null, "");
           console.log("Xegou aqui no excluir aluno"); 
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
                        this.alunoTurma[i].cor="table-default";
                    }
                }
            }
            console.log("mostrarSituação...");  
            
        }
    }

    limpar(aluno: AlunoTurma) {
        const indice = this.encontrarAlunoTurma(aluno);
        if(indice !== -1){
            this.novoAlunoTurma = this.alunoTurma[indice];
            this.novoAlunoTurma.bim1 = null;
            this.novoAlunoTurma.bim2 = null;
            this.novoAlunoTurma.bim3 = null;
            this.novoAlunoTurma.bim4 = null;
            this.novoAlunoTurma.frequencia = null;
            this.calcular();
            this.editando = true;
            console.log("Limpar...");
        }
        
    }


    private newFunction(turma: Turma) {
        this.selecionadoT = turma;
    }
}
