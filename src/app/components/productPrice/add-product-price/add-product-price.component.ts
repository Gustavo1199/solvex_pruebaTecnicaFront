import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductPriceService } from 'src/app/services/ProductPrice/product-price.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../Models/product';
import { ProductPrice } from '../../Models/productPrice';
import Swal from 'sweetalert2';
declare var FileReader: any;

@Component({
  selector: 'app-add-product-price',
  templateUrl: './add-product-price.component.html',
  styleUrls: ['./add-product-price.component.css']
})
export class AddProductPriceComponent {
  productForm: FormGroup;
  product:Product[] = [];
  fileByteArray: Uint8Array | undefined;
  base64Image!:string;
  @Output() getAllProductPrice = new EventEmitter();




  constructor(private formBuilder: FormBuilder, private _productPriceService:ProductPriceService, private _product:ProductService) {
    this.getAllProducts();
    this.productForm = this.formBuilder.group({
      productId: [null, Validators.required],
      urlImage: [null, Validators.required],
      color: [null, Validators.required],
      price: [null, Validators.required],
      file: [null],
      product: [null]
    });
  }
  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    }
  }
  async getAllProducts()
  {
    await this._product.getAllProducts().subscribe((productList:Product[])=>{
      this.product = productList;
    })
  }
  addProduct()
  {

    let {productId,color,price} = this.productForm.value
    let productPriceObj = new ProductPrice(parseInt(productId),"asd",color,price,this.base64Image);
    this._productPriceService.addProductPrice(productPriceObj).subscribe(()=>{
      this.getAllProductPrice.emit();
      Swal.fire('Éxito', 'Producto agregado con exito', 'success');
      this.productForm.reset()
    })
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
