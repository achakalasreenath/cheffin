import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserModel } from 'src/models/user.model';
import { IsUserLoginSessionService } from '../../shared/services/is-user-login-session.service';
import { RegistrationService } from '../../shared/services/registration.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {


  @ViewChild('password') password;
  constructor(private isUserLoginSessionService: IsUserLoginSessionService,
     private register: RegistrationService,
     private router:Router) { }
  user: UserModel = new UserModel("", "", "", "", "", 0, undefined, [], [], '');
  isPasswordMatched: boolean = true;
  confirmPasswordMatched: string;
  isUser: string;
  navigateToProfileRoute: any;
  successMessage: string = '';


  checkPassword(): boolean {
    console.log(this.user.password);
    console.log(this.confirmPasswordMatched);
    if (this.user.password === this.confirmPasswordMatched) {

      this.isPasswordMatched = false;
      return true;
    }
    else if (this.user.password !== this.confirmPasswordMatched) {
      this.isPasswordMatched = true;
      return false;
    }
  }

  ngOnInit() {
    this.isUserLoginSessionService.isUser$.subscribe(isUser => this.isUser = isUser);
    if (this.isUser === 'true') {
      this.navigateToProfileRoute = ['/user/userlogin/', 'true', 'userprofile'];
    }
    else if (this.isUser === 'false') {
      this.navigateToProfileRoute = ['/user/userlogin/', 'true', 'cookpersonalprofile'];
    }
    else if (this.isUser === '') {
      this.navigateToProfileRoute = ['/user/userlogin/', 'false'];
    }

  }
  submit(): void {

    // this.user.password = document.getElementById('passwordId').nodeValue;

    this.register.registerUser(this.user).subscribe(user => console.log(user));
    /*    this.register.sendUserRegistrationMessage(this.user.userName).subscribe(); */
    alert("Registration Successful");
    this.router.navigate(['/user/userlogin/false']);
  }

}
