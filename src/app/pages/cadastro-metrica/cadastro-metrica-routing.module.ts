import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroMetricaPage } from './cadastro-metrica.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroMetricaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroMetricaPageRoutingModule {}
