import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {MainComponent} from "./layout/main/main.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {AllProductComponent} from "./product/all-product/all-product.component";
import {AllUserComponent} from "./user/all-user/all-user.component";
import {AddProductComponent} from "./product/add-product/add-product.component";
import {EditProductComponent} from "./product/edit-product/edit-product.component";
import {AllOrderComponent} from "./order/all-order/all-order.component";
import {AddOrderComponent} from "./order/add-order/add-order.component";
import {EditOrderComponent} from "./order/edit-order/edit-order.component";
import {ItemOrderComponent} from "./order/item-order/item-order.component";
import {AddItemOrderComponent} from "./order/add-item-order/add-item-order.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuardService]},
  {path: 'user', component: AllUserComponent, canActivate: [AuthGuardService]},
  {path: 'product', component: AllProductComponent, canActivate: [AuthGuardService]},
  {path: 'product/add', component: AddProductComponent, canActivate: [AuthGuardService]},
  {path: 'product/edit', component: EditProductComponent, canActivate: [AuthGuardService]},
  {path: 'order', component: AllOrderComponent, canActivate: [AuthGuardService]},
  {path: 'order/add', component: AddOrderComponent, canActivate: [AuthGuardService]},
  {path: 'order/edit', component: EditOrderComponent, canActivate: [AuthGuardService]},
  {path: 'order/:id', component: ItemOrderComponent, canActivate: [AuthGuardService]},
  {path: 'product/:id', component: AddItemOrderComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
