import { Component, EventEmitter, Output } from '@angular/core';
import { ProductPriceService } from 'src/app/services/ProductPrice/product-price.service';
import { ProductPrice } from '../../Models/productPrice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../Models/product';
import Swal from 'sweetalert2';
import { environment } from 'src/enviroment';
declare var FileReader: any;

@Component({
  selector: 'app-edit-product-price',
  templateUrl: './edit-product-price.component.html',
  styleUrls: ['./edit-product-price.component.css']
})
export class EditProductPriceComponent {
selectedProductPrice!:ProductPrice;
productForm: FormGroup;
product!:Product[];
fileByteArray: Uint8Array | undefined;
base64Image!:string;
@Output() getAllProductPrice = new EventEmitter();

constructor(private _productPrice:ProductPriceService,private formBuilder: FormBuilder, private _product:ProductService)
{
  this.productForm = this.formBuilder.group({
    productId: ['', Validators.required],
    urlImage: ['', Validators.required],
    color: ['', Validators.required],
    price: ['', Validators.required],
    file: [''],
  });
}

ngOnInit(): void {

  this.getAllProducts();
}
updateProductprice()
{
  let productId = this.productForm.get('productId')?.value;
  let urlImage =  this.productForm.get('urlImage')?.value;
  let color = this.productForm.get('color')?.value;
  let price =  this.productForm.get('price')?.value
  let file = this.base64Image;
  debugger
  console.log(urlImage);

  let productPriceToEdit = new ProductPrice(parseInt(productId),urlImage,color,price,file, this.selectedProductPrice.id)

  this._productPrice.updateProductPrice(productPriceToEdit).subscribe(()=>{
    this.getAllProductPrice.emit();
    Swal.fire('Éxito', 'Producto actualizado con exito', 'success');
    this.productForm.reset()
  })

}

async getAllProducts()
{
  await this._product.getAllProducts().subscribe((productList:Product[])=>{
    this.product = productList;
  })
}

getSelectedProductPrice(model:ProductPrice)
{
  this.productForm.setValue({
    productId: model.productId,
    urlImage: model.urlImage,
    color: model.color,
    price: model.price,
    file: model.file,
  });

  this.selectedProductPrice = model;
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = btoa(reader.result);
    this.base64Image=base64String;
  };

  reader.readAsBinaryString(file);
}

handleFileInput(event: any) {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      this.convertFileToByteArray(fileContent);
    };

    reader.readAsArrayBuffer(file);
  }
}
convertFileToByteArray(fileContent: ArrayBuffer | null) {
  if (fileContent) {
    const byteArray = new Uint8Array(fileContent);
    this.fileByteArray = byteArray;
    // Haz lo que necesites con el arreglo de bytes
    console.log(this.fileByteArray);
  }
}
}
