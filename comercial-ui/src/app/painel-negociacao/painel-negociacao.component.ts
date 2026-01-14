import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OportunidadeService } from '../oportunidade.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

interface Oportunidade {
  descricao?: string;
  nomeProspecto?: string;
  valor?: number;
}

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class PainelNegociacaoComponent implements OnInit {

  oportunidade: Oportunidade = {};
  oportunidades: Oportunidade[] = [];

  constructor(
    private oportunidadeService: OportunidadeService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.consultar()
  }

  consultar(){
    this.oportunidadeService.listar()
    .subscribe(resposta => this.oportunidades = <any>resposta)
  }

  adicionar(){
    this.oportunidadeService.adicionar(this.oportunidade)
    .subscribe(() =>{
      this.oportunidade = {};
      this.consultar();

      this.messageService.add({
        severity: 'success',
        summary: "Oportunidade adicionada com sucesso!"
      });
    },
    resposta => {

      let msg = "Erro inesperado. Tente novamente.";

      if(resposta.error.message){
        msg = resposta.error.message
      }

      this.messageService.add({
        severity: 'error',
        summary: msg
      });

    });
  }

}
