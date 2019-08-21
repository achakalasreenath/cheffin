import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';
import { UserLoginSessionService } from 'src/app/shared/services/user-login-session.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-update-user-details',
  templateUrl: './update-user-details.component.html',
  styleUrls: ['./update-user-details.component.css']
})
export class UpdateUserDetailsComponent implements OnInit {

  user: UserModel = new UserModel("", "", "", "", "", 0, undefined, [], [], '');
  successMessage: string = '';
    isPasswordMatched: boolean = true;
  confirmPasswordMatched: string;
  constructor(private userLoginSessionservice: UserLoginSessionService, private userProfileservice: UserProfileService) { }

  ngOnInit() {
    this.userLoginSessionservice.user$.subscribe(user => this.user = user);
  }

  submit() {
    this.userProfileservice.updateUserDetails(this.user).subscribe(data => console.log(data), err => console.log(<any>err));
    this.successMessage = "Details Updated successfully";
  }
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
}
