import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MainComponent } from './layout/main/main.component';
import {CdkTableModule} from "@angular/cdk/table";
import { AllProductComponent } from './product/all-product/all-product.component';
import { AllUserComponent } from './user/all-user/all-user.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AllOrderComponent } from './order/all-order/all-order.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { ItemOrderComponent } from './order/item-order/item-order.component';
import { AddItemOrderComponent } from './order/add-item-order/add-item-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    MainComponent,
    AllProductComponent,
    AllUserComponent,
    AddProductComponent,
    EditProductComponent,
    AllOrderComponent,
    EditOrderComponent,
    AddOrderComponent,
    ItemOrderComponent,
    AddItemOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    CdkTableModule
  ],
  providers: [authInterceptorProviders, authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
