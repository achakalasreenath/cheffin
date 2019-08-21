import { Component, OnInit, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { UserModel } from 'src/models/user.model';
import { UserLoginSessionService } from '../../shared/services/user-login-session.service';
import { BsModalService, BsModalRef, RatingComponent } from 'ngx-bootstrap';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { UserProfileService } from '../services/user-profile.service';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { Router } from '@angular/router';
import { ReviewModel } from 'src/models/review.model';
import { LoadDataOnReFreshService } from 'src/app/shared/services/load-data-on-refresh.service';
import { IsUserLoginSessionService } from 'src/app/shared/services/is-user-login-session.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: []

})
export class UserProfileComponent implements OnInit {

  @HostListener('window:beforeunload')
  unloadHandler() {

    this.loadDataOnReloadService.reload();

  }

  @ViewChild("star") rating;
  user: UserModel = new UserModel("", "", "", "", "", 0, undefined, [], [], '');
  cookName: string;
  cookRating: string;
  errorMessage: string;
  modalRef: BsModalRef;
  currentFileUpload: File;
  registerMessage: string;
  userReview: ReviewModel = new ReviewModel("", "", "");
  reviewMessage: string;


  max = 10;

  constructor(private userloginSessionService: UserLoginSessionService,
    private modalService: BsModalService,
    private imageUploadService: ImageUploadService,
    private userProfileService: UserProfileService,
    private registerService: RegistrationService,
    private router: Router,
    private loadDataOnReloadService: LoadDataOnReFreshService,
  private isUserLoginService:IsUserLoginSessionService) {

  }


  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
      this.userloginSessionService.addUser(JSON.parse(localStorage.getItem('user')));
      this.isUserLoginService.addIsUser("true");
    }
    this.userloginSessionService.user$.subscribe(user => {
      this.user = user;
      this.userProfileService.getCookOfUser(this.user.userName).subscribe(cookDetails => {
        this.cookName = cookDetails[0];
        this.cookRating = cookDetails[1];
        console.log(this.cookName);

        if (this.cookName === "You have not registered with anyone yet") {
          this.registerMessage = "Find Cook";
          this.reviewMessage = "Submit Review";
        }
        else {
          this.registerMessage = "De-Register";
          this.userProfileService.getUserReview(this.cookName, this.user.userName).subscribe(data => {
           
            if (data) {
              this.userReview.review = data.review;
              this.reviewMessage = "Edit Review";
            }
            else {
              this.reviewMessage = "Submit Review";
            }
          });
        }

      });
    });

    console.log(this.user.userRating);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  selectFile(event: Event) {

    let target = event.target as HTMLInputElement;
    this.currentFileUpload = (target.files as FileList)[0];
  }
  onProfileFileChanged() {
    
    this.imageUploadService.uploadUserProfileImage(this.currentFileUpload, this.user.userName).subscribe(data =>{console.log(data);
      alert("Image uploaded Successfully");
      window.location.reload();
    },
     err => this.errorMessage = <any>err);

  }
  onProfileImageUpdated() {

    this.imageUploadService.updateUserProfileImage(this.currentFileUpload, this.user.userName).subscribe(data =>{console.log(data);
      alert("Image updated Successfully");
      window.location.reload();
    }, 
    err => this.errorMessage = <any>err);

  }

  deRegisterCook() {
    if (this.registerMessage === "Find Cook") {
      this.router.navigate(['/home']);
    }
    else {
      this.registerService.deRegisterUser(this.user.userName, this.cookName).subscribe(data => {console.log(data);
        alert("Cook De-registered Successfully");
      }
      , err => this.errorMessage = <any>err);
      this.ngOnChanges();
    }

  }
  ngOnChanges() {
    //this.userloginSessionService.addUser(undefined);
    this.registerMessage = "Find Cook";
    this.cookName = "You have not registered with anyone yet";

  }

  updateRating(rating) {
    console.log(rating);
    this.userProfileService.setCookrating(this.cookName, this.user.userName, rating).subscribe(data => console.log(data), err => this.errorMessage = <any>err);
  }

  deactivateAccount() {
    this.userProfileService.deleteAccount(this.user.userName).subscribe(data => console.log(data), err => this.errorMessage = <any>err);
    this.router.navigate(['/user/userlogin/', 'false']);
  }

  reviewMethod() {
    console.log(this.userReview.review);
    if (this.reviewMessage === "Submit Review") {
      this.userReview.cookUserName = this.cookName;
      this.userReview.userName = this.user.userName;
      this.reviewMessage= "Edit Review"
      this.userProfileService.giveReview(this.cookName, this.user.userName, this.userReview).subscribe(data => console.log(data), err => this.errorMessage = <any>err);
      console.log("submit method executed");
    }
    else if (this.reviewMessage === "Edit Review") {
      this.userReview.cookUserName = this.cookName;
      this.userReview.userName = this.user.userName;
      this.userProfileService.updateUserReview(this.cookName, this.user.userName, this.userReview).subscribe(data => console.log(data), err => this.errorMessage = <any>err);
      console.log("update method executed");
    }
  }

}
