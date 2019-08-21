import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimepickerModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookModule } from './cook/cook.module';
import { UserModule } from './user/user.module';
import { IgxTabsModule } from 'igniteui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing-module/routing-module.module';
import { AppRoutingModule } from './app-routing.module';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { IgxNavbarModule, IgxIconModule, IgxNavigationDrawerModule, IgxCardModule, IgxAvatarModule, IgxButtonModule, IgxDropDownModule } from 'igniteui-angular';
import { CarouselModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    CookModule,
    UserModule,
    RoutingModule,
    TabsModule.forRoot(),
    IgxTabsModule,
    BrowserAnimationsModule,
    IgxNavbarModule, IgxIconModule, IgxNavigationDrawerModule, IgxCardModule, IgxAvatarModule, IgxButtonModule, IgxDropDownModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot()

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, UserLoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
