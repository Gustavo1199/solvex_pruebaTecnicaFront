import { Component } from '@angular/core';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
product!:Product;

constructor(){}

async productDetail(model:Product)
{
  console.log(model)
  this.product = await model;
}

}
