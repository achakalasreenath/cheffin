import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from '../user/user-login/user-login.component';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { CookProfileComponent } from '../cook/cook-profile/cook-profile.component';
import { CookPersonalProfileComponent } from '../cook/cook-personal-profile/cook-personal-profile.component';
import { CookRegistrationComponent } from '../cook/cook-registration/cook-registration.component';
import { UserRegistrationComponent } from '../user/user-registration/user-registration.component';
import { UpdateCookDetailsComponent } from '../cook/update-cook-details/update-cook-details.component';
import { UpdateUserDetailsComponent } from '../user/update-user-details/update-user-details.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: 'user/:login', component: UserRegistrationComponent },
  { path: 'cook/:login', component: CookRegistrationComponent },
  { path: 'user/userlogin/:login', component: UserLoginComponent },
  { path: 'user/userlogin/:login/userprofile', component: UserProfileComponent },
  { path: 'user/userlogin/:login/cookpersonalprofile', component: CookPersonalProfileComponent },
  { path: 'user/userlogin/:login/userprofile/updatedetails', component: UpdateUserDetailsComponent },
  { path: 'user/userlogin/:login/cookpersonalprofile/updatedetails', component: UpdateCookDetailsComponent },
  { path: 'cookprofile/:userName', component: CookProfileComponent },
  { path: "**", component: HomeComponent }


];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],

  exports: [RouterModule]



})
export class RoutingModule { }
