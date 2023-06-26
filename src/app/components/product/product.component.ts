import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../Models/product';
import { FormControl } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import Swal from 'sweetalert2';
import { LoginServicesService } from 'src/app/services/login/login-services.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product[] = [];
  productsTemp: Product[] = [];
  myControl: FormControl;
  currentPage: number = 1;
  pageSize: number = 10;
  estadoModal:boolean = false;
  modelVisibleGetProducts:boolean = false;
  modelVisibleUpdateProduct:boolean = false;
  modalVisible:boolean = false;
  isAdmin:boolean =false;
  isSeller:boolean =false;
  isUser:boolean =false;



  @ViewChild(EditProductComponent) editProduct!: EditProductComponent;
  @ViewChild(ProductDetailComponent) productDetailsComponent!: ProductDetailComponent;

  constructor(private _productServices: ProductService, private appComponent: AppComponent, public authServices:LoginServicesService) {
    this.myControl = new FormControl();
    this.myControl.valueChanges.subscribe(value => {
      this.getFoundedProducts(value);
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    if (localStorage.getItem("token") != null) {
      this.appComponent.isLogged = true;
      this.isAdmin = this.authServices.validateRole("admin")
      this.isUser = this.authServices.validateRole("user")
      this.isSeller =this.authServices.validateRole("seller")
    }
  }

addProduct()
{
  this.modalVisible = true;
}

  async getAllProducts() {
    await this._productServices.getAllProducts().subscribe((productList: Product[]) => {
      this.product = productList;
      //this.productsTemp = productList;
    })
  }

  async getFoundedProducts(productName: string) {
    await this._productServices.getProductsByName(productName).subscribe((data: Product[]) => {
      this.product = data;
      this.currentPage = 1; // Reset the current page to 1 when filtering products
    }, (error) => {
      if (error.status == 404) {
        this.product = this.productsTemp;
        this.currentPage = 1; // Reset the current page to 1 when filtering products
      }
    });
  }

  deleteProduct(model:Product) {
    this._productServices.deleteProduct(model).subscribe(()=>{
      this.getAllProducts()
      Swal.fire('Éxito', 'producto eliminado con exito', 'success');
    })
  }

 async  selectCard(model:Product) {
    this.estadoModal = true;
    this.modelVisibleUpdateProduct = true;
    await this.editProduct.selectedProduct(model);
    await this.getAllProducts();

  }

  async selectCardToGetDetails(model:Product)
  {
    this.estadoModal = true
    if(this.productDetailsComponent){
      this.modelVisibleGetProducts= true;
      await this.productDetailsComponent.productDetail(model)
    }
  }


  get productSlice(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.product.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
