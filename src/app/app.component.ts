import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private authService: AuthService) {
  }

  async ngOnInit() {
 
  }

  logout() {
    this.authService.logout();
  }

}
