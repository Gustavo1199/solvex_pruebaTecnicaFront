import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../Models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm!: FormGroup;
  @Output() getAllUsers = new EventEmitter();


  constructor(private formBuilder: FormBuilder, private _userServices:UserService){
    this.userForm = this.formBuilder.group({
      userName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      rol: ['',Validators.required],
    });
  }

  async addUser()
  {
    let userName =  this.userForm.get('userName')?.value;
    let email = this.userForm.get('email')?.value
    let password = this.userForm.get('password')?.value
    let rol = this.userForm.get('rol')?.value
    let userModel = new User(userName,email,password, rol);
    (await this._userServices.create(userModel)).subscribe(result=>{
      let validate =this.validateResult(result);
      if(validate==null)
      {
        Swal.fire('Éxito', 'La operación se completó con éxito', 'success');
        this.userForm.reset();
        this.getAllUsers.emit()
      }
      else
      {
        Swal.fire('Error', `${validate}'`, 'error');
      }


    })
  }

  validateResult(result:any)
  {
    let jsonResponse =  result.errors[0]
    if(result.succeeded)
    {
      return null;
    }
    var respuesta =  jsonResponse.description
    return respuesta
  }

}
