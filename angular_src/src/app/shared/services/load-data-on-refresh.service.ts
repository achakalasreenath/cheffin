import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject } from 'rxjs';

import { CookModel } from 'src/models/cook.model';
import { IsUserLoginSessionService } from './is-user-login-session.service';
import { UserLoginSessionService } from './user-login-session.service';
import { UserModel } from 'src/models/user.model';
import { CookLoginSessionService } from './cook-login-session.service';
import { CookSearchService } from 'src/app/cook/services/cook-search.service';
import { UserProfileService } from 'src/app/user/services/user-profile.service';

@Injectable({
    providedIn: 'root'
})
export class LoadDataOnReFreshService {

    user: UserModel;
    cook: CookModel;
    tempUser: UserModel;
    tempCook: CookModel;
    isUser:string;
    constructor(private isUserLoginSessionService: IsUserLoginSessionService,
        private userLoginSessionService: UserLoginSessionService,
        private cookLoginSessionService: CookLoginSessionService,
        private cookSearchService: CookSearchService,
        private userProfileService: UserProfileService) {

    }
    reload() {
        console.log("on reload")
        this.isUserLoginSessionService.isUser$.subscribe(isUser => {
            this.isUser = isUser;
            if (this.isUser === 'true') {
                    this.userLoginSessionService.user$.subscribe(user => {
                        this.user = user;
                        this.userProfileService.getUserDetails(this.user.userName).subscribe(tempUser => {
                            this.tempUser = tempUser;
                            localStorage.setItem('user', JSON.stringify(this.tempUser));
                            
                        });
                    });
            }
            else if (this.isUser === 'false') {
              
                    this.cookLoginSessionService.cook$.subscribe(cook => {
                        this.cook = cook;
                        console.log(this.cook.userName);
                        this.cookSearchService.getCookByCookUserName(this.cook.userName).subscribe(tempCook => {
                            this.tempCook = tempCook;
                            localStorage.setItem('cook', JSON.stringify(this.tempCook));
                            console.log(this.tempCook);

                        });
                    });
            }

        });

    }
}
