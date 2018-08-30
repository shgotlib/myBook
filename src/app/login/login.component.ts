import { AuthService } from './../shared/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  public email: string;
  public password: string;

  constructor(public afAuth: AngularFireAuth, public authService: AuthService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if(user) {
        this.user = user;
      }
    });
  }

  login() {
    let res = this.authService.login(this.email, this.password);
    if(res) {
      this.snackBar.open(res, null, {
        duration: 3000
      });
    }
  }

  signup() {
    this.authService.signup(this.email, this.password);
  }

}