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
    novo: Aluno = new Aluno('',null, 0, null,null, null, null, null, "N/I");
    editando = false;
    mediando: number;
    cont= 0;
    mediaDaTurma: number;
    

    constructor() {
        this.title = 'Alunos';
        this.alunos = [
            new Aluno('Carol Danvers', 1001, null, null, null, null, null, null, "N/I"),
            new Aluno('Clint Barton', 1001, 10, 10, 10, 10, null, null, "N/I"),
            new Aluno('Natasha Romanoff', 1001, null, null, null, null, null, null, "N/I"),
            new Aluno('Steve Rogers', 1001, null, null, null, null, null, null, "N/I"),
            new Aluno('Wade Wilson', 1001, 10, 10, 10, 10, null, null, "N/I")
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
            this.novo = new Aluno('',null, null, null,null, null, null, null, "N/I");
            console.log("Com inclusão de alunos...");
        }
        else{
            this.novo = new Aluno('',null, null, null,null, null, null, null, "N/I");
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
        let cont = 0;
        let mediando = 0;
        var resum:number = 0;
        var sum = (number1: number, number2: number) =>  number1 + number2;
        var todasNotas=[];

        for (let i=0; i< this.alunos.length; i++){
            if(this.alunos[i].bim1 == null && this.alunos[i].bim2 == null && this.alunos[i].bim3 == null && this.alunos[i].bim4 == null){
                this.alunos[i].media = null;
                if(this.alunos[i].frequencia == null){
                    this.alunos[i].situacaoFinal = null;
                }
            }
            else{
                todasNotas = [this.alunos[i].bim1, this.alunos[i].bim2,this.alunos[i].bim3, this.alunos[i].bim4];
                for(let nota of todasNotas){
                    if(nota != null || nota == 0){
                        resum = sum(nota.valueOf() , resum);
                        cont += 1;
                    }

                }
                //TODO:: fazendo para as quatro notas
                //if(this.alunos[i].bim1 != null || this.alunos[i].bim1 == 0){
                    //mediando = mediando + this.alunos[i].bim1;
                    //resum = sum(this.alunos[i].bim1.valueOf() , resum);
                    //cont += 1;
                //}
                //if(this.alunos[i].bim2 != null || this.alunos[i].bim2 == 0){
                    //mediando = mediando + this.alunos[i].bim2;
                    //resum = sum(this.alunos[i].bim2.valueOf() , resum);
                    //cont += 1;
                //}
                //if(this.alunos[i].bim3 != null || this.alunos[i].bim3 == 0){
                    //mediando = mediando + this.alunos[i].bim3;
                    //resum = sum(this.alunos[i].bim3.valueOf() , resum);
                    //cont += 1;
                //}
                //if(this.alunos[i].bim4 != null || this.alunos[i].bim4 == 0){
                    //mediando = mediando + this.alunos[i].bim4;
                    //resum = sum(this.alunos[i].bim3.valueOf() , resum);
                    //cont += 1;
                //}
                this.alunos[i].media = resum/cont;
                mediaTurma+= this.alunos[i].media;
                
                console.log("Calculando media aluno...", this.alunos[i].media, mediaTurma);
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
       
    }

    mostrarSituacao(): void{
        for (let i=0; i< this.alunos.length; i++){
            const fre = 200;
            if(this.alunos[i].frequencia <= (fre * 75/100) && this.alunos[i].frequencia != null){
                this.alunos[i].situacaoFinal= "REPROVADO POR FALTA";
            }
            else{
                if(this.alunos[i].media >= 7){
                this.alunos[i].situacaoFinal= "APROVADO";
                }
                else{
                    if(this.alunos[i].media < 7 && this.alunos[i].media != null)
                    {
                     this.alunos[i].situacaoFinal= "REPROVADO";
                    }
                    else{
                        this.alunos[i].situacaoFinal= "N/I";
                    }
                }
            }
            
        }
    }

    executar(): void{
        this.calcular();
        this.mostrarSituacao();
    }
}
