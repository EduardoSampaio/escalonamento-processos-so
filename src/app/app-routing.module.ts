import { EscalonamentoComponent } from './pages/escalonamento/escalonamento.component';
import { TelaInicialComponent } from './pages/tela-inicial/tela-inicial.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'inicial', component: TelaInicialComponent },
  { path: 'escalonamento', component: EscalonamentoComponent },
  { path: '', redirectTo: '/inicial', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
