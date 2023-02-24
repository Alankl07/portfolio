import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { PageControlComponent } from './components/page-control/page-control.component';

const routes: Routes = [
  {path: '', component: InitialPageComponent},
  {path: 'control', component: PageControlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
