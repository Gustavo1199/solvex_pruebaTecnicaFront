import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/components/Models/user';
import { environment } from 'src/enviroment';
import { LoginServicesService } from '../login/login-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path:string = `${environment.apiUrl}/User`;
  constructor(private _http:HttpClient, private loginAuth:LoginServicesService) { }
  token = this.loginAuth.getToken()?.toString();
  modifiedToken = this.token?.replace(/^"(.*)"$/, '$1');
   getUser()
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
    let userData = this._http.get<User[]>(`${this.path}/GetAll/1/10`,{headers})
    return userData;
  }

  async create(model:User)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
    let userData =await this._http.post<any>(`${this.path}/Create`, model,{headers})
    return userData;
  }

  async delete(id?:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
    let userData =await this._http.delete<User[]>(`${this.path}/Delete/${id}`,{headers})
    return userData;
  }

  async update(model:User, id?:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.modifiedToken}`);
    let userData =await this._http.put<User[]>(`${this.path}/Update/${id}`,model,{headers})
    return userData;
  }





}
