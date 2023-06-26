import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../Models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userForm!: FormGroup;
  @Output() getAllUsers = new EventEmitter();
  selectedUser!:User;


  constructor(private formBuilder: FormBuilder, private _userServices:UserService){
    this.userForm = this.formBuilder.group({
      userName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      rol: ['',Validators.required],
    });
  }


  getSelectedUser(model:User)
  {
    this.selectedUser = model;
    this.userForm.setValue({
      userName: model.userName,
      email: model.email,
      password: model.password,
      rol: model.roles[0].toLowerCase(),
    });
  }

  async UpdateUser()
  {
    let userName =  this.userForm.get('userName')?.value;
    let email = this.userForm.get('email')?.value
    let password = this.userForm.get('password')?.value
    let rol = this.userForm.get('rol')?.value
    let userModel = new User(userName,email,password, rol);
    (await this._userServices.update(userModel, this.selectedUser.id)).subscribe(()=>{
      this.getAllUsers.emit();
      Swal.fire('Éxito', 'La operación se completó con éxito', 'success');
      this.userForm.reset();
    }
    )

  }
}
