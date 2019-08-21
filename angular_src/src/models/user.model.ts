import { Injectable } from '@angular/core';
import { CookModel } from './cook.model';
import { ReviewModel } from './review.model';


export class UserModel{
    
    
    constructor(
        public userName:string,
        public userFirstName:string,
        public userLastName:string,
        public password: string,
        public userEmail:string,
        public  userRating:Number,
        public profileImage:Blob,
        public previousCooks:CookModel[],
        public reviews:ReviewModel[],
        public userContact:string
       ){

    }
    
    
    
    
}