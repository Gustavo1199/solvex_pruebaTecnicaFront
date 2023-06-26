import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment';
import { authUser } from 'src/app/components/Models/authUser';

@Injectable({
  providedIn: 'root'
})

export class LoginServicesService {
  path:string = `${environment.apiUrl}/Login/login ` ;
  constructor(private _http:HttpClient) { }

  authUser(model:authUser)
  {
    let loginPath = this._http.post(this.path, model)
    return loginPath;
  }
  validateRole(userRol: string):boolean {
    let rol = localStorage.getItem("rol");
    if(userRol == rol)
    {
      return true
    }

    return false;
  }

  getToken()
  {
    let token = localStorage.getItem('token');
    return token;
  }

}
