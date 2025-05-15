import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroMetricaPageRoutingModule } from './cadastro-metrica-routing.module';

import { CadastroMetricaPage } from './cadastro-metrica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroMetricaPageRoutingModule
  ],
  declarations: [CadastroMetricaPage]
})
export class CadastroMetricaPageModule {}
