import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookRegistrationComponent } from './cook/cook-registration/cook-registration.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { RoutingModule } from './routing-module/routing-module.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }
  


];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
    RoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }