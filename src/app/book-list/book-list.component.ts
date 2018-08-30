import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book/book.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Array<any>;

  constructor(private bookService: BookService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.bookService.getAll().subscribe(data => {
      console.log(data);
      console.log('done');
      
      this.books = data;
    });
  }
}
