import { Component, OnInit } from '@angular/core';
import { Aluno } from './aluno';
import '../assets/css/style.css';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title: string;
    alunos: Array<Aluno>;
    selecionado: Aluno;
    novo: Aluno = new Aluno('',null, null, null,null, null, null, null, "N/I");
    editando = false;
    mediando: number;
    cont= 0;
    mediaDaTurma: number;
    

    constructor() {
        this.title = 'Alunos';
        this.alunos = [
            new Aluno('Carol Danvers', 1001, null, null, null, null, null, null, ''),
            new Aluno('Clint Barton', 1001, 10, 10, 10, 10, null, null, ''),
            new Aluno('Natasha Romanoff', 1001, null, null, null, null, null, null, ''),
            new Aluno('Steve Rogers', 1001, null, null, null, null, null, null, ''),
            new Aluno('Wade Wilson', 1001, 10, 10, 10, 10, null, null, '')
        ];
    }

    ngOnInit(): void {
    }

    heroiSelecionado(aluno: Aluno): void {
        this.selecionado = aluno;
    }

    encontrar(nome: string): number{
        console.log("excluindo...", nome);
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

    cadastrar(): void {
        if(!this.editando){
            this.alunos.push(new Aluno(this.novo.nome, this.novo.turma, this.novo.bim1, this.novo.bim2, this.novo.bim3, this.novo.bim4, this.novo.media, this.novo.frequencia, this.novo.situacaoFinal));
            this.novo = new Aluno('',null, null, null,null, null, null, null, "N/I");;
            console.log("Com inclusão de alunos...");
        }
        else{
            this.novo = new Aluno('',null, null, null,null, null, null, null, "N/I");;
            this.editando = false;
            console.log("Sem inclusão de alunos...");
        }
        
        //this.novo = new Aluno('',0, 0, 0, 0, 0, 0, 0, '');
    }

    registrar(aluno: Aluno): void{
        const indice = this.encontrar(aluno.nome);

        if(indice !== -1){
            this.novo = this.alunos[indice];
            this.editando = true;
            console.log("Registrar...");
        }
    }
    
    calcular(): void{
        let indice = -1;
        let mediaTurma =0;
        let contando = 0;
        for (let i=0; i< this.alunos.length; i++){
            if(this.alunos[i].bim1 == null && this.alunos[i].bim2 == null && this.alunos[i].bim3 == null && this.alunos[i].bim4 == null){
                this.alunos[i].media = null;
                if(this.alunos[i].frequencia == null){
                    this.alunos[i].situacaoFinal == null;
                }
            }
            else{
                if(this.alunos[i].bim1 != null){
                    this.mediando += this.alunos[i].bim1;
                    this.cont += 1;
                }
                if(this.alunos[i].bim2 != null){
                    this.mediando += this.alunos[i].bim2;
                    this.cont += 1;
                }
                if(this.alunos[i].bim3 != null){
                    this.mediando += this.alunos[i].bim3;
                    this.cont += 1;
                }
                if(this.alunos[i].bim4 != null){
                    this.mediando += this.alunos[i].bim4;
                    this.cont += 1;
                }
                this.alunos[i].media = this.mediando/this.cont;
                mediaTurma+= this.alunos[i].media;
                console.log("Calculando media aluno...", this.alunos[i].media, mediaTurma);
            }                
            contando +=1;
            this.mediando = 0;
            this.cont = 0;    
            console.log("Calculando...");
            
    }
        this.mediaDaTurma = mediaTurma/contando;
        console.log("Calculando media turma...", this.mediaDaTurma);           
       
    }

    mostrarSituacao(): void{
        for (let i=0; i< this.alunos.length; i++){
            const fre = 200;
            if(this.alunos[i].frequencia <= (fre * 75/100)){
                this.alunos[i].situacaoFinal= "REPROVADO POR FALTA";
            }
            else{
                if(this.alunos[i].media >= 7){
                this.alunos[i].situacaoFinal= "APROVADO";
                }
                else{
                    this.alunos[i].situacaoFinal= "REPROVADO";
                }
            }
            
        }
    }

    executar(): void{
        this.calcular();
        this.mostrarSituacao();
    }
}
