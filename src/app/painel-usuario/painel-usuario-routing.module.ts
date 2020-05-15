import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PainelUsuarioPage } from './painel-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PainelUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PainelUsuarioPageRoutingModule {}
