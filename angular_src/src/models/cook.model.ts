import { FoodType } from './food-type.model';
import { UserModel } from './user.model';
import { Image } from './Image.model';





export class CookModel{
    
 constructor(
     public userName:string,
     public cookFirstName:string,
     public cookLastName:string,
     public password:string,
     public  cookEmail:string,
     public cookAadhaar :string,
     public cookGender:string,
     public cookAge:Number,
     public cookCategory:string,
     public cookLocation:string,
     public currentAddress:string,
     public permanentAddress:string,
     public languages:string[],
     public foodType:string[],
     public cookFeePerMonth:Number,
     public cookRating:Number,
     public totalUsers: Number,
     public sampleRecipeImages:Image[],
     public profileImage :Image,
     public users:UserModel[],
     public cookContact:string
  
 ){ }


}