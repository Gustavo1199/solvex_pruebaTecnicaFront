import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../Models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  productForm: FormGroup;
  selectedData!:Product;
  @Output() getAllProduct = new EventEmitter();


  constructor(private _productServices:ProductService,private formBuilder: FormBuilder){
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async selectedProduct(model:Product)
  {
    console.log(model)
    this.productForm.setValue({
      name: model.name,
      description: model.description

    });
    this.selectedData= await model;
  }

  async updateProduct()
  {
    let productId = this.selectedData.id;
    let name =this.productForm.get('name')?.value
    let description =this.productForm.get('description')?.value
    let objProduct =  new Product(name, description, productId);
    await this._productServices.updateProduct(objProduct).subscribe(()=>{
      this.getAllProduct.emit()
      Swal.fire('Éxito', 'producto actualizado con exito', 'success');
      this.productForm.reset();

    })
  }
}
