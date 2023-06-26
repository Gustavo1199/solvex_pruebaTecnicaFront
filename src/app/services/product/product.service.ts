import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/components/Models/product';
import { environment } from 'src/enviroment';
import { LoginServicesService } from '../login/login-services.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  path:string = `${environment.apiUrl}/Product`;

  constructor(private _http:HttpClient, private loginAuth:LoginServicesService) { }
  token = this.loginAuth.getToken()?.toString();
  //modifiedToken = this.token?.replace(/^"(.*)"$/, '$1');

getAllProducts():Observable<Product[]>{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  let products = this._http.get<Product[]>(`${this.path}/GetAllProducts`,{headers});
  return products;
}

getProductsByName(productFounded:string):Observable<Product[]>
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  let products = this._http.get<Product[]>(`${this.path}/SearchProducts/${productFounded}`,{headers});
  return products;
}

addProduct(model:Product):Observable<Product[]>
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  let products = this._http.post<Product[]>(`${this.path}/CreateProduct/`,model,{headers});
  return products;
}

deleteProduct(model:Product):Observable<Product[]>
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  let products = this._http.delete<Product[]>(`${this.path}/DeleteProduct/${model.id}`,{headers});
  return products;
}

updateProduct( model:Product):Observable<Product[]>
{
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  let products = this._http.put<Product[]>(`${this.path}/UpdateProduct`, model,{headers});
  return products;
}


}
