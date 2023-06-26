import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.css']
})
export class HomeSectionComponent {

  constructor(private appComponent:AppComponent)
  {

  }

  ngOnInit(): void {
    if(localStorage.getItem("token") != null)
    {
      this.appComponent.isLogged = true;
    }else
    {
      this.appComponent.isLogged = false;

    }

  }

}
