import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BookService } from '../shared/book/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  current = 'books';

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  changeView(view) {
    this.current = view;
  }

}
