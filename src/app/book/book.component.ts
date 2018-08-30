import { Component, OnInit, OnDestroy, TemplateRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../shared/book/book.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  id: string;
  book: any;
  private sub: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.bookService.get(this.id).subscribe(item => this.book = item);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  orderBook() {
    const dialogRef = this.dialog.open(DialogTemplate, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data === 'yes') {
        let books = localStorage.getItem('books');
        let booksArr = books ? books.split(';') : [];
        booksArr = booksArr.filter((v, i, a) => a.indexOf(v) === i); 
        booksArr.push(this.id);
        localStorage.setItem('books', booksArr.join(';'));
        this.snackBar.open('The item added to your cart', '', { duration: 2000 });
        this.router.navigate(['/home']);
      }
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <p>Are you sure you want order this book?</p>
    <button mat-raised-button (click)="dialogRef.close('yes')">Yes</button>
    <button mat-raised-button (click)="dialogRef.close('no')">No</button>
  `
})
export class DialogTemplate {

  constructor(
    public dialogRef: MatDialogRef<DialogTemplate>) {}

}