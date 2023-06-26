import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../Models/user';
import { AppComponent } from 'src/app/app.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginServicesService } from 'src/app/services/login/login-services.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: User[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  userForm!: FormGroup;
  @ViewChild(EditUserComponent) editUserComponent!: EditUserComponent;
  @ViewChild(UserDetailsComponent) userDetailsComponent!: UserDetailsComponent;
  isAdmin:boolean =false;
  isSeller:boolean =false;
  isUser:boolean =false;


  constructor(private _userServices: UserService, private appComponent: AppComponent, public authServices:LoginServicesService)
  {

  }

  ngOnInit(): void {
    this.getAllUsers();
    if (localStorage.getItem("token") != null) {
      this.appComponent.isLogged = true;
      this.isAdmin = this.authServices.validateRole("admin")
      this.isUser = this.authServices.validateRole("user")
      this.isSeller =this.authServices.validateRole("seller")
    }
  }

   getAllUsers() {
    debugger

    ( this._userServices.getUser()).subscribe((userData: User[]) => {
      this.users = userData;
    });
    console.log(this.users)
    console.log("")
    console.log("No traje na"+this.users)
  }

  async deleteUser(model: User) {
    (await this._userServices.delete(model.id)).subscribe(
      () => {
        this.getAllUsers();
        Swal.fire('Éxito', 'Eliminado con exito', 'success');
      },
      (error) => {
        //console.error("Error deleting user:", error);
        this.getAllUsers();
      }
    );
  }

  selectUserToUpdate(model:User)
  {
    this.editUserComponent.getSelectedUser(model)
  }

  async getUserDetails(model:User)
  {
    this.userDetailsComponent.userDetails(model)
  }

  get productSlice(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
