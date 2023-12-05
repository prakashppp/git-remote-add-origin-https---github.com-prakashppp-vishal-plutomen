import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { SerachComponent } from './serach/serach.component';

const routes: Routes = [
  {path:'custo',component:CustomerComponent},
  {path:'',component:CustomerComponent},
  {path:'search/:searchItem',component:CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
