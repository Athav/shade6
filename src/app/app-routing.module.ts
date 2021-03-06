import { ProductListComponent } from './product-list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'side-nav', component: MainDashboardComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'add-product', component: ProductAddComponent },
      { path: 'update-product', component: UpdateproductComponent },
      { path: 'view-product', component: ViewproductComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
