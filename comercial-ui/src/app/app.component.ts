import { Component } from '@angular/core';
import { PainelNegociacaoComponent } from './painel-negociacao/painel-negociacao.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [PainelNegociacaoComponent]
})
export class AppComponent {

}
