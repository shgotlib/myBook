import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp  } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  user: Observable<any>;
  private auth: any;

  constructor(private firebaseAuth: AngularFireAuth,
    @Inject(FirebaseApp) fa : any,
    private router: Router,
    public usersService: UsersService) {

      this.user = firebaseAuth.authState;
      this.auth = fa.auth();
  }

  signup(email: string, password: string) {
    if(email == '' || password == '') {
      return "Required fields are missings";
    }
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        let user = {
          name: email.split('@')[0],
          email,
        }
        this.usersService.save(user).subscribe(newUser => console.log(newUser));
        return "registration successful";
      })
      .catch(err => {
        console.log('Error');
      });
  }

  login(email: string, password: string) {
    if(email == '' || password == '') {
      return "Required fields are missings";
    }
    try {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          this.router.navigate(['/dashboard']);
        })
        .catch(err => {
          return "An error occurred " + err;
        });
      } catch (e) {
        return 'Error' + e.getMessage;
      }
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(res => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        return "An error occurred " + err;
      });
  }

}