import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../shared/book/book.service';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, OnDestroy {
  book: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    public afAuth: AngularFireAuth,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.bookService.get(id).subscribe((book: any) => {
          if (book) {
            this.book = book;
            this.book.href = book._links.self.href;
          } else {
            this.snackBar.open(`Book with id '${id}' not found, returning to list`, null, {
              duration: 2000,
            }).afterDismissed().subscribe(data => {
              this.gotoList();
            })
            
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/dashboard']);
  }

  save(form: NgForm) {
    this.bookService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.bookService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
