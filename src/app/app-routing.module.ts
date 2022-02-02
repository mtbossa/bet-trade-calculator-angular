import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppRoutingModule } from './modules/main-app-routing.module';

const ROUTES: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES), MainAppRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
