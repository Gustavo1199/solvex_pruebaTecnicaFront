import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSectionComponent } from './components/login-section/login-section.component';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'', component:LoginSectionComponent},
  {path:'home', component:HomeSectionComponent},
  {path:'product', component:ProductComponent},
  {path:'user', component:UserComponent},
  { path: '*', redirectTo:'', pathMatch: 'full' },

];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]  
})
export class AppRoutingModule { }
