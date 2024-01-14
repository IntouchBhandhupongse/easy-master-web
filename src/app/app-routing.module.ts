import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  { path: 'master', component: MasterComponent },
  { path: '', redirectTo: '/master', pathMatch: 'full' }, // redirect to `master`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
