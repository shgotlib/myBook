import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any[];

  constructor(private bookService: BookService) {
  }

  async ngOnInit() {
    this.bookService.getAll().subscribe(items => this.books = items);
  }
}
