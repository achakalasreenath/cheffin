import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StarComponent } from './components/star.component';

@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,


  ],
  exports: [StarComponent]

})
export class SharedModule {
}
