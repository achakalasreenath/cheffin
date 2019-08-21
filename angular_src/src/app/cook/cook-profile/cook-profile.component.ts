import { Component, OnInit } from '@angular/core';
import { CookModel } from 'src/models/cook.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CookSearchService } from '../services/cook-search.service';

import { Observable } from 'rxjs';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { IsUserLoginSessionService } from 'src/app/shared/services/is-user-login-session.service';
import { UserLoginSessionService } from 'src/app/shared/services/user-login-session.service';
import { UserModel } from 'src/models/user.model';
import { ReviewModel } from 'src/models/review.model';

@Component({
  selector: 'app-cook-profile',
  templateUrl: './cook-profile.component.html',
  styleUrls: ['./cook-profile.component.css']
})
export class CookProfileComponent implements OnInit {

  cook: CookModel = new CookModel("", "", "", "", "", "", "", 0, "", "default", "", "", [], [], 0, 0, 0, [], undefined, [], '');
  user: UserModel = new UserModel("", "", "", "", "", 0, undefined, [], [], '');
  errorMessage: string;
  userName: string;
  isUser: string;
  reviews: ReviewModel[] = [];
  isReviews: boolean = false;
  imageUrl: string = '';
  imageIndex: number[] = [];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private cookSearchByUserName: CookSearchService,
    private registrationService: RegistrationService,
    private isUserLoginSessionService: IsUserLoginSessionService,
    private userLoginsessionService: UserLoginSessionService,
    private cookSearchService: CookSearchService,) {
    this.userName = this.route.snapshot.paramMap.get('userName');
    console.log(this.userName);
  }


  register() {
    if (this.isUser === 'true') {
      this.registrationService.registerCookToUser(this.user.userName, this.cook.userName).subscribe(data => {console.log(data);
        alert("you have been successfully registered with chef "+ this.cook.userName);}, err => console.log(<any>err));
      
      this.registrationService.sendHiredRegistrationMessage(this.user.userName, this.cook.userName).subscribe(data => console.log(data), err => console.log(<any>err));

    }
    else {
      alert("You need to login first");
      this.router.navigate(['/user/userlogin', 'false']);
    }

  }

  ngOnInit() {
    this.cookSearchByUserName.getCookByCookUserName(this.userName).subscribe(
      cook => {
      this.cook = cook;
      this.imageUrl = 'http://localhost:9090/api/cook/getCookImage/' + this.cook.userName;
     /*  let i = 0;
        while (i < this.cook.sampleRecipeImages.length) {
          console.log(i);
          this.imageIndex[i] = i;
          i = i + 1; */
          // tslint:disable-next-line:max-line-length
          // this.recipeImageUrls.push("http://localhost:8080/cook/getCookRecipeImage/"+this.cook.userName+"/" + this.cook.sampleRecipeImages[i].imageId);}
      
       },
      err => this.errorMessage = <any>err);
    this.isUserLoginSessionService.isUser$.subscribe(isUser => this.isUser = isUser);
    if (this.isUser === 'true') {
      this.userLoginsessionService.user$.subscribe(user => this.user = user);
    }
  }

  getReviews() {
    if (this.isReviews == false) {
      this.isReviews = true;

    }
    else { this.isReviews = false; }
    this.cookSearchService.getReviews(this.cook.userName).subscribe(reviews => this.reviews = reviews);
    console.log(this.reviews);
  }

}
