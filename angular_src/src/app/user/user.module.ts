import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from '../routing-module/routing-module.module';
import { NgModule } from '@angular/core';
import { UpdateUserDetailsComponent } from './update-user-details/update-user-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserLoginComponent, UserProfileComponent, UserRegistrationComponent, UpdateUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    SharedModule
  ],
  exports: [UserLoginComponent, UserProfileComponent, UserRegistrationComponent]

})
export class UserModule {
}
