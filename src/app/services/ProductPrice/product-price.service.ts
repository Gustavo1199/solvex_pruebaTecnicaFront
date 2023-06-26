import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPrice } from 'src/app/components/Models/productPrice';
import { environment } from 'src/enviroment';
import { LoginServicesService } from '../login/login-services.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceService {


  path:string = `${environment.apiUrl}/ProducPrice`;
  constructor(private _http:HttpClient, private loginAuth:LoginServicesService) { }
  token = this.loginAuth.getToken()?.toString();
  modifiedToken = this.token?.replace(/^"(.*)"$/, '$1');

getAllProducts():Observable<ProductPrice[]>{

  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
  let productsPrice = this._http.post<ProductPrice[]>(`${this.path}/GetAllProductPrice/1/10`,[],{headers});
  return productsPrice;
}
addProductPrice(model:ProductPrice)
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
  let productsPrice = this._http.post<ProductPrice[]>(`${this.path}/CreateProductPrice`,model,{headers});
  return productsPrice;
}
deleteProductPrice(productPriceId:number)
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
  let productsPrice = this._http.delete(`${this.path}/DeleteProductPrice/${productPriceId}`,{headers});
  return productsPrice

}
searchProductPrice(inputField:string,value:string):Observable<ProductPrice[]>{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
  let productsPrice = this._http.post<ProductPrice[]>(`${this.path}/GetAllProductPrice/1/10`,[{fieldName: `${inputField}`,value:`${value}` }],{headers});
  return productsPrice;
}
updateProductPrice(model:ProductPrice)
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
  let productsPrice = this._http.put<ProductPrice[]>(`${this.path}/UpdateProductPrice`,model,{headers});
  return productsPrice;
}
getProductById(inputField:string,value:number):Observable<ProductPrice>{

  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
  let productsPrice = this._http.post<ProductPrice>(`${this.path}/GetAllProductPrice/1/10`,[{fieldName: `id`,value:`${value}` }],{headers});
  return productsPrice;
}






}
