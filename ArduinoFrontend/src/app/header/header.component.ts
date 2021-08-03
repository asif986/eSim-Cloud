import { Component, OnInit, Input } from '@angular/core';
import { Login } from '../Libs/Login';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Class For Header Component (DO Eager Loading)
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * Login Token
   */
  token: string;
  /**
   * Username
   */
  username: string;
  /**
   * window
   */
  window: any;
  /**
   * Header Title
   */
  @Input() title: string;
  /**
   * Color of the title
   */
  @Input() color: string;
  /**
   * Is it a Front Page
   */
  @Input() front = false;
  /**
   * Constructor for Header
   * @param api API Service
   */
  constructor(
    private api: ApiService,
    private aroute: ActivatedRoute,
    
  ) { }
  /**
   * On Init
   */
  ngOnInit() {
    // Get Login Token
    if (environment.production == false) {
      this.aroute.queryParams.subscribe((paramData: any) => {
        if (paramData.token != null) {
          console.log(paramData.token);
          // Login.getToken(paramData.token);
          localStorage.setItem('esim_token', paramData.token);
          // Get Login Token
          this.token = Login.getToken();

          // If token is available then get username
          if (this.token) {
            this.api.userInfo(this.token).subscribe((v) => {
              this.username = v.username;
            }, (err) => {
              console.log(err.status)
              console.log(err);
              // if (err.status === 401) {
              // Login.logout();
              // }
            });
          }
        } else {
          console.log("hi");
        }
      });
    }

    // If token is available then get username
    // Get Login Token
    this.token = Login.getToken();
    // console.log(this.token);
    // If token is available then get username
    if (this.token) {
      this.api.userInfo(this.token).subscribe((v) => {
        this.username = v.username;
      }, (err) => {
        console.log(err.status)
        console.log(err);
        // if (err.status === 401) {
        // Login.logout();
        // }
      });
    }

    // Initializing window
    this.window = window;
  }
  /**
   * Redirect to login
   */
  Login() {
    Login.redirectLogin(this.front);
  }
  /**
   * Handle Logout
   */
  Logout() {
    Login.logout();
  }
}
