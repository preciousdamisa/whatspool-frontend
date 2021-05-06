import { NgModule } from '@angular/core';

import { AlertComponent } from './components/alert/alert.component';
import { Alert2Component } from './components/alert2/alert2.component';
import { InPageSpinnerComponent } from './components/in-page-spinner/in-page-spinner.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AlertComponent,
    Alert2Component,
    InPageSpinnerComponent,
    SpinnerComponent,
  ],
  exports: [
    AlertComponent,
    Alert2Component,
    InPageSpinnerComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
