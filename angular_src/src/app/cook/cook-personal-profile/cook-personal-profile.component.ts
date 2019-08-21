import { Component, OnInit, TemplateRef, OnChanges, HostListener } from '@angular/core';
import { CookModel } from 'src/models/cook.model';
import { CookLoginSessionService } from 'src/app/shared/services/cook-login-session.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { Subject } from 'rxjs';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { UserModel } from 'src/models/user.model';
import { CookSearchService } from '../services/cook-search.service';
import { Router } from '@angular/router';
import { ReviewModel } from 'src/models/review.model';
import {  LoadDataOnReFreshService } from 'src/app/shared/services/load-data-on-refresh.service';
import { IsUserLoginSessionService } from 'src/app/shared/services/is-user-login-session.service';
import { Image } from 'src/models/Image.model';

@Component({
  selector: 'app-cook-personal-profile',
  templateUrl: './cook-personal-profile.component.html',
  styleUrls: ['./cook-personal-profile.component.css']
})
export class CookPersonalProfileComponent implements OnInit, OnChanges {
  @HostListener('window:beforeunload')
  unloadHandler() {
  
    this.loadDataOnReloadService.reload();
  
  
  }

  modalRef: BsModalRef;
  imageIndex: number[] = [];
  selectedFiles: FileList;
  currentFileUpload: File;
  errorMessage: string;
  //cookProfileImage:any;
  imageUrl: string = '';
  ObservableUrl: Subject<string>;
  reviews: ReviewModel[] = [];
  isReviews: boolean = false;

  //recipeImageUrls: string[] =[];

  cook: CookModel = new CookModel("", "", "", "", "", "", "", 0, "", "default", "", "", [], [], 0, 0, 0, [], undefined, [], '');
  users: UserModel[];
  constructor(private cookLoginSessionService: CookLoginSessionService,
    private modalService: BsModalService,
    private imageUploadService: ImageUploadService,
    private registrationService: RegistrationService,
    private cookSearchService: CookSearchService,
    private router: Router,
    private loadDataOnReloadService: LoadDataOnReFreshService,
  private isUserLoginService:IsUserLoginSessionService) { }

  ngOnInit() {

  
    if (JSON.parse(localStorage.getItem('cook'))) {
      console.log(localStorage.getItem('cook'));
      this.cookLoginSessionService.addCook(JSON.parse(localStorage.getItem('cook')));
      this.isUserLoginService.addIsUser("false");
      
    }
    
      console.log("login");
      this.cookLoginSessionService.cook$.subscribe(cook => {
        this.cook = cook;
        this.users = this.cook.users;
        this.imageUrl = 'http://localhost:9090/api/cook/getCookImage/' + this.cook.userName;
      /*   let i = 0;

        while (i < this.cook.sampleRecipeImages.length) {
          console.log(i);
          this.imageIndex[i] = i;
          i = i + 1; */
          // tslint:disable-next-line:max-line-length
          // this.recipeImageUrls.push("http://localhost:8080/cook/getCookRecipeImage/"+this.cook.userName+"/" + this.cook.sampleRecipeImages[i].imageId);}
        
      });
      console.log(this.cook);
    }
  



  ngOnChanges() {
    this.imageUrl = "http://localhost:9090/api/cook/getCookImage/" + this.cook.userName;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  selectFile(event: Event) {

    let target = event.target as HTMLInputElement;
    this.currentFileUpload = (target.files as FileList)[0];
  }
  /*   selectRecipeFile(event:Event){
  
      let target= event.target as HTMLInputElement;
      this.currentFileUpload = (target.files as FileList)[0];
    } */

  onRecipeFileChanged() {
    this.imageUploadService.uploadRecipeImage(this.currentFileUpload, this.cook.userName).subscribe(data =>{console.log(data); 
      alert("Image uploaded Successfully");
      this.cook.sampleRecipeImages.push(new Image(undefined,this.currentFileUpload));
      window.location.reload();
    },
      err => this.errorMessage = <any>err);

  }
  onProfileFileChanged() {

    this.imageUploadService.uploadCookProfileImage(this.currentFileUpload, this.cook.userName).subscribe(data => {console.log(data); 
      alert("Image uploaded Successfully");
      window.location.reload();
    },
       err => this.errorMessage = <any>err);

  }
  deleteRecipeImage(imageId: number) {
    console.log(imageId);
    this.imageUploadService.deleteCookRecipeImages(this.cook.userName, imageId).subscribe(data =>{console.log(data);
     alert("Image deleted Successfully");
 
    
     this.cook.sampleRecipeImages
     window.location.reload();
    },
      err => this.errorMessage = <any>err);
  }
  onProfileImageUpdated() {

    this.imageUploadService.updateCookProfileImage(this.currentFileUpload, this.cook.userName).subscribe(data => {console.log(data);
      alert("Image updated Successfully");
      window.location.reload();
    }, 
      err => this.errorMessage = <any>err);
    this.imageUrl = "http://localhost:9090/api/cook/getCookImage/" + this.cook.userName;
  }
  deRegisterCookToUser(userName: string) {

    this.registrationService.deRegisterUser(userName, this.cook.userName).subscribe(data => {console.log(data);
      alert("User De-registered Successfully");
      window.location.reload();
    }, 
    err => this.errorMessage = <any>err);

  }
  deactivateAccount() {
    this.cookSearchService.deleteAccount(this.cook.userName).subscribe(data => console.log(data), err => this.errorMessage = <any>err);
    this.router.navigate(['/user/userlogin/', 'false']);
  }
  getReviews() {
    if (this.isReviews == false) {
      this.isReviews = true;
    }
    else { this.isReviews = false; }
    this.cookSearchService.getReviews(this.cook.userName).subscribe(reviews => this.reviews = reviews);
    console.log(this.reviews);
  }

  ngOnDestroy() {



  }
}
