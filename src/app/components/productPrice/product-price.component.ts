import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductPriceService } from 'src/app/services/ProductPrice/product-price.service';
import { ProductPrice } from '../Models/productPrice';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../Models/product';
import { GetProductPriceDetailsComponent } from './get-product-price-details/get-product-price-details.component';
import { ModalComponent } from '../modal/modal.component';
import { FormControl } from '@angular/forms';
import { EditProductPriceComponent } from './edit-product-price/edit-product-price.component';
import Swal from 'sweetalert2';
import { LoginSectionComponent } from '../login-section/login-section.component';
import { LoginServicesService } from 'src/app/services/login/login-services.service';
import { environment } from 'src/enviroment';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent {

productsPrice:ProductPrice[] = [];
product:Product[]=[];
modalVisible: boolean = false;
modelVisibleGetProducts:boolean = false;
modelVisibleUpdateProduct:boolean = false;
modalImageSrc: string = '';
myControl: FormControl;
estadoModal:boolean = false;
@ViewChild(GetProductPriceDetailsComponent) productPrice!: GetProductPriceDetailsComponent;
@ViewChild(EditProductPriceComponent) editProductPrice!: EditProductPriceComponent;
@ViewChild(ModalComponent) modal!: ModalComponent;
isAdmin:boolean =false;
isSeller:boolean =false;
isUser:boolean =false;
relarivePath:string = environment.imagePath;


constructor(private _productPrice:ProductPriceService, private _productServices:ProductService,public authServices:LoginServicesService)
{
  this.myControl = new FormControl();
    this.myControl.valueChanges.subscribe(value => {
      this.getFoundedProducts(value);
    });
}

ngOnInit(): void {
 this.getProductPrice();
 this.isAdmin = this.authServices.validateRole("admin")
 this.isUser = this.authServices.validateRole("user")
 this.isSeller =this.authServices.validateRole("seller")
}

addProduct()
{
  this.modalVisible = true;
}

getProductPrice()
{
  this._productPrice.getAllProducts().subscribe((productPrice:ProductPrice[])=>{
    this.productsPrice = productPrice;
  })
}

getProductPriceDetails(details:ProductPrice)
{
  this.estadoModal = true;

  if(this.productPrice){
    this.modelVisibleGetProducts = true;
    this.productPrice.obtenerInformacionDelPadre(details)
  }
}

async deleteProductPrice(productPriceId:number)
{
  await this._productPrice.deleteProductPrice(productPriceId).subscribe(()=>{
    this.getProductPrice();
    Swal.fire('Éxito', 'Producto eliminado con exito', 'success');

  }

  );

}

updateUser(model:ProductPrice)
{
  this.estadoModal = true;
  if(this.productPrice){
    this.modelVisibleUpdateProduct = true;
    this.editProductPrice.getSelectedProductPrice(model);
  }
}

async getFoundedProducts(productName:string)
{
  await this._productPrice.searchProductPrice("name",productName).subscribe((data:ProductPrice[])=>{
    this.productsPrice = data;
  });
}



}
