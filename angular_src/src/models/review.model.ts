import { Injectable } from '@angular/core';


export class ReviewModel{
    constructor(
        public cookUserName: string,
        public userName:string,
        public review :string 
    ){

    }
}