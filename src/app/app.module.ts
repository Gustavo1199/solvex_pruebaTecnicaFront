import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { ProductComponent } from './components/product/product.component';
import { ProductModule } from './components/product/product.module';
import { LoginSectionComponent } from './components/login-section/login-section.component';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProductPriceModule } from './components/productPrice/product-price.module';
import { ProductPriceComponent } from './components/productPrice/product-price.component';
import { AddProductPriceComponent } from './components/productPrice/add-product-price/add-product-price.component';
import { GetProductPriceDetailsComponent } from './components/productPrice/get-product-price-details/get-product-price-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProductPriceComponent } from './components/productPrice/edit-product-price/edit-product-price.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeSectionComponent,
    ProductComponent,
    LoginSectionComponent,
    GenericModalComponent,
    ModalComponent,
    ProductPriceComponent,
    AddProductPriceComponent,
    GetProductPriceDetailsComponent,
    EditProductPriceComponent,
    ProductComponent,
    EditProductComponent,
    AddProductComponent,
    ProductDetailComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    UserDetailsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductModule,
    ProductPriceModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
