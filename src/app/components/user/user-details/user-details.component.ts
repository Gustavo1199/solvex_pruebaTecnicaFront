import { Component } from '@angular/core';
import { User } from '../../Models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
user!:User;
  async userDetails(model:User)
  {
    this.user = model;
  }
}
