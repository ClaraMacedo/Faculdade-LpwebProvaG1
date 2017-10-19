import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ListaTurmasComponent } from './lista-turmas/lista-turmas.component';
import { ListaAlunosComponent } from './lista-alunos/lista-alunos.component';
//import { HeroiComponent } from './heroi/heroi.component';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        ListaTurmasComponent,
        ListaAlunosComponent,
        //HeroiComponent,
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
