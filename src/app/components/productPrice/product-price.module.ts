import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPriceRoutingModule } from './product-price-routing.module';
import { GetProductPriceDetailsComponent } from './get-product-price-details/get-product-price-details.component';
import { EditProductPriceComponent } from './edit-product-price/edit-product-price.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ProductPriceRoutingModule
  ]
})
export class ProductPriceModule { }
