import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../Models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  myFormGroup: FormGroup;
  @Output() getAllProduct = new EventEmitter();

  constructor(private _productServices:ProductService,private formBuilder: FormBuilder){
    this.myFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }


  async addProduct()
  {
    let{name, description} = this.myFormGroup.value
    let productModel = new Product(name, description)
    await this._productServices.addProduct(productModel).subscribe(()=>{
      this.getAllProduct.emit();
      Swal.fire('Éxito', 'producto Agregado con exito', 'success');
      this.myFormGroup.reset()
    })
  }
}
