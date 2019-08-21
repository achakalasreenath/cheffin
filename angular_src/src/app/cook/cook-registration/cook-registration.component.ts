import { Component, ViewChild, OnInit } from '@angular/core';
import { CookModel } from 'src/models/cook.model';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { RegistrationService } from '../../shared/services/registration.service';
import { Image } from 'src/models/Image.model';
import { Observable } from 'rxjs';
import { CookLoginSessionService } from 'src/app/shared/services/cook-login-session.service';
import { ActivatedRoute, Router } from '@angular/router';





@Component({

  templateUrl: './cook-registration.component.html',
  styleUrls: ['./cook-registration.component.css']
})
export class CookRegistrationComponent implements OnInit {
  @ViewChild("form") form;
  @ViewChild("profileimage") profileImage;
  @ViewChild("recipeimage") recipeImage;
  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
  constructor(private register: RegistrationService,
     private cookLoginSessionService: CookLoginSessionService,
     private route: ActivatedRoute,
     private router:Router) {

  }
  locations: string[] = ["Bangalore", "Hyderabad", "Chennai", "Tirupati", "Calicut"];
  cook: CookModel = new CookModel("", "", "", "", "", "", "", 0, "", "default", "", "", [], [], 0, 0, 0, [], undefined, [], '');
  hasLocationError: boolean = false;
  startDate: Date = new Date();
  successMessage: string = '';
  confirmPasswordMatched: string = '';
  isPasswordMatched: boolean;




  hasLocationErrorMethod(value): void {
    if (value == 'default') {
      this.hasLocationError = true;
    }
    else {
      this.hasLocationError = false;
    }

  }


  ngOnInit() {

    if (this.route.snapshot.paramMap.get("login") === 'true') {
      this.cookLoginSessionService.cook$.subscribe(cook => this.cook = cook);
      console.log(this.cook);
    }
    else {
      this.cook = new CookModel("", "", "", "", "", "", "", 0, "default", "", "", "", [], [], 0, 0, 0, [], undefined, [], '');
    }
  }




  toggleIsEnglish() {
    if (this.form.English = true) {
      this.cook.languages.push('English');
    }
    else {
      console.log(this.cook.languages);

      this.cook.languages = this.cook.languages.filter(language => (language !== 'English'));


    }
  }
  toggleIsHindi() {
    if (this.form.Hindi = true) {
      this.cook.languages.push('Hindi');
    }
    /*  else if(this.form.Hindi=false) {
      this.cook.languages = this.cook.languages.filter(language => (language !== "Hindi"));


     } */
  }
  toggleIsTelugu() {
    if (this.form.Telugu = true) {
      this.cook.languages.push('Telugu');
    }
    /* else if(this.form.Telugu=false) {
     this.cook.languages = this.cook.languages.filter(language => (language !== "Telugu"));


    } */
  }
  toggleIsTamil() {
    if (this.form.Tamil = true) {
      this.cook.languages.push('Tamil');
    }
    /* else if(this.form.Tamil=false){
     this.cook.languages = this.cook.languages.filter(language => (language !== "Tamil"));


    } */
  }
  toggleIsKannada() {
    if (this.form.Kannada = true) {
      this.cook.languages.push('Kannada');
    }
    /*  else if(this.form.Kannada=false){
      this.cook.languages = this.cook.languages.filter(language => (language !== "Kannada"));


     } */
  }
  toggleIsSouthIndian(): void {
    if (this.form.SouthIndian = true) {
      this.cook.foodType.push('SouthIndian');
    }
    /* else if(this.form.SouthIndian=false) {
      this.cook.foodType = this.cook.languages.filter(food => (food !== "SouthIndian"));


     } */
  }
  toggleIsNorthIndian(): void {
    if (this.form.NorthIndian = true) {
      this.cook.foodType.push('NorthIndian');
    }
    /*  else if(this.form.NorthIndian = false){
       this.cook.foodType = this.cook.languages.filter(food => (food !== "NorthIndian"));
 
 
      } */
  }
  toggleIsChinese(): void {
    if (this.form.Chinese = true) {
      this.cook.foodType.push('Chinese');
    }
    /* else if(this.form.Chinese = false){
      this.cook.foodType = this.cook.languages.filter(food => (food !== "Chinese"));


     } */
  }

  submit(): void {
    this.register.registerCook(this.cook).subscribe(cook => console.log(cook));
    /*   this.register.sendCookRegistrationMessage(this.cook.userName).subscribe(data => console.log(data), err => console.log(<any>err)); */
   alert("Registration Successful");
   this.router.navigate(['/user/userlogin/false']);
  }
  checkPassword(): boolean {
    console.log(this.cook.password);
    console.log(this.confirmPasswordMatched);
    if (this.cook.password === this.confirmPasswordMatched) {

      this.isPasswordMatched = false;
      return true;
    }
    else if (this.cook.password !== this.confirmPasswordMatched) {
      this.isPasswordMatched = true;
      return false;
    }
  }




}