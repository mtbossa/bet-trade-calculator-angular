import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const DASHBOARD_ROUTES = [
  {
    path: '',
    component: DashboardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
