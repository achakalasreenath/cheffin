import { Component, ViewChild, OnInit } from '@angular/core';
import { SearchQueryService } from './shared/services/search-query.service';
import { HorizontalAlignment, VerticalAlignment, ConnectedPositioningStrategy, CloseScrollStrategy, IgxDropDownComponent, IgxOverlayOutletDirective, OverlaySettings, ISelectionEventArgs } from 'igniteui-angular';
import { UserLoginSessionService } from './shared/services/user-login-session.service';
import { UserModel } from 'src/models/user.model';
import { CookLoginSessionService } from './shared/services/cook-login-session.service';
import { IsUserLoginSessionService } from './shared/services/is-user-login-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(IgxDropDownComponent) public menu: IgxDropDownComponent;
  @ViewChild(IgxOverlayOutletDirective) public igxOverlayOutlet: IgxOverlayOutletDirective;
  @ViewChild('drawer') drawer;
  route: any;
  messageroute: any;
  open: boolean = false;
  welcomeMessage: string;
  loginMessage: string;
  user: UserModel;
  isUser: string;
  cookRegistrationRouteParameter: string;
  userRegistrationRouteParameter: string;

  private _searchQuery: string = '';
  cookLoginService: any;
  public get searchQuery(): string {
    return this._searchQuery;
  }
  public set searchQuery(value: string) {
    this._searchQuery = value;
    this.searchQueryService.addSearchQuery(this._searchQuery);
  }

  positionSettings = {
    horizontalStartPoint: HorizontalAlignment.Left,
    horizontalDirection: HorizontalAlignment.Left,
    verticalStartPoint: VerticalAlignment.Bottom
  };



  public onSelection(eventArgs: ISelectionEventArgs) {
    eventArgs.cancel = true;
  }


  overlaySettings = {
    closeOnOutsideClick: true,
    modal: false,
    positionStrategy: new ConnectedPositioningStrategy(this.positionSettings),
    scrollStrategy: new CloseScrollStrategy()
  };


  constructor(private searchQueryService: SearchQueryService,
    private userLoginSessionService: UserLoginSessionService,
    private cookLoginSessionService: CookLoginSessionService,
    private isUserLoginservice: IsUserLoginSessionService) {

  }




  isOpen() {
    if (this.open = true) {
      this.open = false;
    }
    if (this.open == false) {
      this.open == false;
    }

  }


  public toggleDropDown(eventArgs) {
    this.drawer.toggle();
    const overlaySettings: OverlaySettings = {
      closeOnOutsideClick: true,
      modal: false,
      outlet: this.igxOverlayOutlet,
      positionStrategy: new ConnectedPositioningStrategy(this.positionSettings),
      scrollStrategy: new CloseScrollStrategy()
      //scrollStrategy: new NoOpScrollStrategy()

    };

    overlaySettings.positionStrategy.settings.target = eventArgs.target;
    this.menu.toggle(overlaySettings);


  }

  ngOnInit() {

    /*   this.isUserLoginservice.isUser$.subscribe(isUser=> this.isUser = isUser);
     */
    console.log(this.isUser);
    /* if(this.isUser == ''){
      console.log('isUser = null');
      this.welcomeMessage= "Have An Account ?";
      this.loginMessage = "Sign In";
      this.messageroute = ['/userlogin/', 'false'];
      this.route = ['/userlogin/','false'];
    } */


    console.log('isUser = true');
    this.isUserLoginservice.isUser$.subscribe(isUser => {
      this.userLoginSessionService.user$.subscribe(user => {
        if (isUser === '') {
          this.welcomeMessage = "Have An Account ?";
          this.loginMessage = "Sign In";
          this.messageroute = ['/user/userlogin/', 'false'];
          this.userRegistrationRouteParameter = 'false';
          this.route = ['/user/userlogin/', 'false'];

        }
        else if (isUser === 'true') {
          this.welcomeMessage = 'Hello ' + user.userName;
          this.loginMessage = "Sign Out";
          this.messageroute = ['/user/userlogin/', 'true', 'userprofile'];
          this.userRegistrationRouteParameter = 'true';
          this.route = ['/user/userlogin/', 'false'];

        }
      });



      console.log('isUser = false');
      this.cookLoginSessionService.cook$.subscribe(cook => {
        if (isUser === '') {
          this.welcomeMessage = "Have An Account ?";
          this.loginMessage = "Sign In";
          this.messageroute = ['/user/userlogin/', 'false'];
          this.cookRegistrationRouteParameter = 'false';
          this.route = ['/user/userlogin/', 'false'];

        }
        else if (isUser === 'false') {
          this.welcomeMessage = 'Hello Chef ' + cook.userName;
          this.loginMessage = "Sign Out";
          this.messageroute = ['/user/userlogin/', 'true', 'cookpersonalprofile'];
          this.cookRegistrationRouteParameter = 'true';
          this.route = ['/user/userlogin', 'false'];

        }
      });

    });


  }



}
