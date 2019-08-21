import { Component, OnInit, Output, ViewChild, forwardRef, AfterViewInit } from '@angular/core';
import { UserModel } from 'src/models/user.model';
import { LoginService } from '../../shared/services/login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLoginSessionService } from '../../shared/services/user-login-session.service';
import { CookModel } from 'src/models/cook.model';
import { CookLoginSessionService } from '../../shared/services/cook-login-session.service';
import { IsUserLoginSessionService } from '../../shared/services/is-user-login-session.service';
import { Image } from 'src/models/Image.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']


})
export class UserLoginComponent implements OnInit {
  // tempUser:UserModel = new UserModel(0,'','','','');
  user: UserModel = new UserModel("", "", "", "", "", 0, undefined, [], [], '');
  cook: CookModel = new CookModel("", "", "", "", "", "", "", 0, "", "default", "", "", [], [], 0, 0, 0, [], undefined, [], '');
  // tempCook:CookModel= new CookModel(0,"","",0,"default",0,'',0,0,[{foodType:''},{foodType:''},{foodType:''}],[]);
  enteredUserName: string;
  enteredPassword: string;
  isPasswordMatched: boolean;
  errorMessage: string;

  isUser: string;


  isLoginUser: string;

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private userLoginService: LoginService,
    private userLoginSessionService: UserLoginSessionService,
    private cookLoginSessionService: CookLoginSessionService,
    private isUserLoginSessionService: IsUserLoginSessionService
  ) {

  }

  getUserByUserName() {

    console.log(this.isUser);
    if (this.isUser === 'true') {
      this.userLoginService.getUserService(this.enteredUserName).subscribe(
        user => {
          this.user = user;
          //this.userLoginSessionService.addUser(this.user);
          console.log(this.user);

        },
        error => this.errorMessage = <any>error)
      //console.log(this.user);

    }
    else if (this.isUser === 'false') {
      this.userLoginService.getCookService(this.enteredUserName).subscribe(
        cook => {
          this.cook = cook;
          //this.cookLoginSessionService.addCook(this.cook);
          console.log(this.user);

        },
        error => this.errorMessage = <any>error)
      // console.log(this.cook);

    }
  }
  login() {

    /*     if(this.isUser){
          this.userLoginSessionService.user$.subscribe(user=> this.user = user);
        }
        else{
          this.cookLoginSessionService.cook$.subscribe( cook => this.cook = cook);
        }
         */
    if (this.user === null || this.cook === null) {
      this.isPasswordMatched = true;
    }
    if ((this.isUser === 'true') && (this.user != null)) {
      if (this.enteredPassword == this.user.password) {
        this.isUserLoginSessionService.addIsUser(this.isUser);
        this.userLoginSessionService.addUser(this.user);
        this.isPasswordMatched = false;
        this.route.navigate(['/user/userlogin/', 'true', 'userprofile']);
      }
      else {
        this.isPasswordMatched = true;
      }
    }
    else if (this.isUser === 'false' && (this.cook != null)) {

      if (this.enteredPassword == this.cook.password) {
        this.isUserLoginSessionService.addIsUser(this.isUser);
        this.cookLoginSessionService.addCook(this.cook);
        this.isPasswordMatched = false;
        this.route.navigate(['/user/userlogin/', 'true', 'cookpersonalprofile']);
      }
      else {
        this.isPasswordMatched = true;
      }
    }
  }



  ngOnInit() {
    this.isUserLoginSessionService.isUser$.subscribe(isUser => this.isLoginUser = isUser);
    if (this.isLoginUser === 'true') {

      if (this.activatedRoute.snapshot.paramMap.get('login') == 'true') {
        this.route.navigate(['/user/userlogin/', 'true', 'userprofile'])
      }
      else {
        this.userLoginSessionService.addUser(new UserModel("", "", "", "", "", 0, undefined, [], [], ''));
        this.isUserLoginSessionService.addIsUser('');
        localStorage.removeItem('user');
      }
    }
    else if (this.isLoginUser === 'false') {
      if (this.activatedRoute.snapshot.paramMap.get('login') == 'true') {
        this.route.navigate(['/user/userlogin/', 'true', 'cookpersonalprofile'])
      }
      else {

        this.cookLoginSessionService.addCook(new CookModel("", "", "", "", "", "", "", 0, "", "default", "", "", [], [], 0, 0, 0, [], undefined, [], ''));
        this.isUserLoginSessionService.addIsUser('');
        localStorage.removeItem('cook');
      }


    }




  }

}
