import { NgModule } from '@angular/core';
import { RoutingModule } from '../routing-module/routing-module.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
