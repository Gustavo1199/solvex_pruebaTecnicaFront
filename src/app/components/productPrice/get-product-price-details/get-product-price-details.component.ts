import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductPrice } from '../../Models/productPrice';
import { environment } from 'src/enviroment';

@Component({
  selector: 'app-get-product-price-details',
  templateUrl: './get-product-price-details.component.html',
  styleUrls: ['./get-product-price-details.component.css']
})
export class GetProductPriceDetailsComponent {
  productPrice!:ProductPrice;
  relarivePath:string = environment.imagePath;


  obtenerInformacionDelPadre(product:ProductPrice) {
    console.log("here")
    this.productPrice = product;
  }



}
