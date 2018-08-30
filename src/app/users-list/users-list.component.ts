import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from '../shared/user/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any;

  constructor(public afAuth: AngularFireAuth, public usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => this.users = users);
  }

}
