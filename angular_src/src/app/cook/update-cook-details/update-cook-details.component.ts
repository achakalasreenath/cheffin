import { Component, OnInit, ViewChild } from '@angular/core';
import { CookLoginSessionService } from 'src/app/shared/services/cook-login-session.service';
import { CookModel } from 'src/models/cook.model';
import { Image } from 'src/models/Image.model';
import { CookSearchService } from '../services/cook-search.service';
@Component({
  selector: 'app-update-cook-details',
  templateUrl: './update-cook-details.component.html',
  styleUrls: ['./update-cook-details.component.css']
})
export class UpdateCookDetailsComponent implements OnInit {

  @ViewChild("updateForm") updateForm;
  cook: CookModel = new CookModel("", "", "", "", "", "", "", 0, "", "default", "", "", [], [], 0, 0, 0, [], undefined, [], '');
  confirmPasswordMatched: string = '';
  isPasswordMatched: boolean;
  successMessage: string = '';
  hasLocationError: boolean = false;
  locations: string[] = ["Bangalore", "Hyderabad", "Chennai", "Tirupati", "Calicut"];
  constructor(private cookLoginSessionService: CookLoginSessionService, private updateCookService: CookSearchService) { }

  ngOnInit() {
    this.cookLoginSessionService.cook$.subscribe(cook => this.cook = cook);
  }
  submit() {

    this.updateCookService.updateCookDetails(this.cook).subscribe(cook => console.log(cook));
    this.successMessage = "Details Updated Successfully";

  }
   hasLocationErrorMethod(value): void {
    if (value == 'default') {
      this.hasLocationError = true;
    }
    else {
      this.hasLocationError = false;
    }

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
  toggleIsEnglish() {
    if (this.updateForm.English = true) {
      this.cook.languages.push('English');
    }
    else {
      console.log(this.cook.languages);

      this.cook.languages = this.cook.languages.filter(language => (language !== 'English'));


    }
  }
  toggleIsHindi() {
    if (this.updateForm.Hindi = true) {
      this.cook.languages.push('Hindi');
    }
    /*  else if(this.form.Hindi=false) {
      this.cook.languages = this.cook.languages.filter(language => (language !== "Hindi"));


     } */
  }
  toggleIsTelugu() {
    if (this.updateForm.Telugu = true) {
      this.cook.languages.push('Telugu');
    }
    /* else if(this.form.Telugu=false) {
     this.cook.languages = this.cook.languages.filter(language => (language !== "Telugu"));


    } */
  }
  toggleIsTamil() {
    if (this.updateForm.Tamil = true) {
      this.cook.languages.push('Tamil');
    }
    /* else if(this.form.Tamil=false){
     this.cook.languages = this.cook.languages.filter(language => (language !== "Tamil"));


    } */
  }
  toggleIsKannada() {
    if (this.updateForm.Kannada = true) {
      this.cook.languages.push('Kannada');
    }
    /*  else if(this.form.Kannada=false){
      this.cook.languages = this.cook.languages.filter(language => (language !== "Kannada"));


     } */
  }
  toggleIsSouthIndian(): void {
    if (this.updateForm.SouthIndian = true) {
      this.cook.foodType.push('SouthIndian');
    }
    /* else if(this.form.SouthIndian=false) {
      this.cook.foodType = this.cook.languages.filter(food => (food !== "SouthIndian"));


     } */
  }
  toggleIsNorthIndian(): void {
    if (this.updateForm.NorthIndian = true) {
      this.cook.foodType.push('NorthIndian');
    }
    /*  else if(this.form.NorthIndian = false){
       this.cook.foodType = this.cook.languages.filter(food => (food !== "NorthIndian"));
 
 
      } */
  }
  toggleIsChinese(): void {
    if (this.updateForm.Chinese = true) {
      this.cook.foodType.push('Chinese');
    }
    /* else if(this.form.Chinese = false){
      this.cook.foodType = this.cook.languages.filter(food => (food !== "Chinese"));


     } */
  }
}
