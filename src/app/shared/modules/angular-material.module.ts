import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatSidenavModule],
  exports: [MatButtonModule, MatInputModule, MatSidenavModule],
  providers: [],
})
export class AngularMaterialModule {}
