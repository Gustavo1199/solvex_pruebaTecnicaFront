import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { authUser } from '../Models/authUser';
import { LoginServicesService } from 'src/app/services/login/login-services.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.css']
})
export class LoginSectionComponent {
  loginForm:FormGroup;

  constructor(private _formBuilder:FormBuilder, private _loginServices:LoginServicesService, private _route:Router,private appComponent:AppComponent)
  {
    this.loginForm = this._formBuilder.group({
      user:[''],
      pass:['']
    });

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem("token") != null) {
      this.appComponent.isLogged = true;
    }
    else
    {
      this.appComponent.isLogged = false;

    }
  }


  async loginUser()
  {
    if(this.loginForm.valid)
    {
      const loginFormValues = this.loginForm.value;
      const userData =  new authUser(loginFormValues.user,loginFormValues.pass,true)
      await this._loginServices.authUser(userData).subscribe((result:any)=>{
        this.saveToken(result.token)
        this.saveUserRol(result.rol);
        if(localStorage.getItem("token") != null)
        {
          this.appComponent.isLogged = true;
        }
        this._route.navigateByUrl('/home');
      })
    }
  }

  saveToken(tokenParameter: string): void {
    let token = tokenParameter;
    localStorage.setItem('token', token);
  }

  saveUserRol(userRol: string): void {
    let convertToken = userRol.toLowerCase()
    localStorage.setItem('rol', convertToken);
  }

}
