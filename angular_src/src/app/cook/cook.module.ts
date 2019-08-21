import { NgModule } from '@angular/core';
import { RoutingModule } from '../routing-module/routing-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookPersonalProfileComponent } from './cook-personal-profile/cook-personal-profile.component';
import { CookProfileComponent } from './cook-profile/cook-profile.component';
import { CookRegistrationComponent } from './cook-registration/cook-registration.component';
import { UpdateCookDetailsComponent } from './update-cook-details/update-cook-details.component';

@NgModule({
    declarations: [
      CookPersonalProfileComponent,CookProfileComponent,CookRegistrationComponent, UpdateCookDetailsComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      RoutingModule
  
    ],
    exports:[CookPersonalProfileComponent,CookProfileComponent,CookRegistrationComponent]
   
  })
  export class CookModule {
  }
  