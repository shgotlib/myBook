import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book/book.service';
import { OrdersService } from '../shared/order/orders.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  books = [];

  constructor(public bookService: BookService,
    private router: Router,
    private ordersService: OrdersService,
    public afAuth: AngularFireAuth,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    let books = localStorage.getItem('books');
    if(books) {
      let booksArr = books.split(';');
      
      booksArr = booksArr.filter((v, i, a) => a.indexOf(v) === i);
      
      for(let b of booksArr) {
        this.bookService.get(b).subscribe(book => {
          book['id'] = b;
          this.books.push(book)
        });
        
      }
      this.books.sort((a,b) =>  a.id + b.id);
    }
  }

  emptyCart() {
    localStorage.setItem('books', '');
    this.books = [];
  }

  remove(book) {
    let booky = this.books.find(b => b.id == book);
    this.books.splice(this.books.indexOf(booky), 1);

    let books = localStorage.getItem('books') || '';
    let remain = books.split(';').filter(b => b != book).join(';');
    localStorage.setItem('books', remain);
  }

  checkout() {
    let books = localStorage.getItem('books') || '';
    if(books == '') {
      return;
    }
    let user;
    this.afAuth.user.subscribe(u => {
      user = u.email;
    
      let order = {
        userEmail: user,
        booksId: books,
        status: 'pending'
      };

      for(let book of this.books) {
        let booky = book;
        if(book.qty < 1) {
          this.books.splice(this.books.indexOf(book), 1);
          continue;
        }
        booky.qty = (parseInt(book.qty) - 1).toString();

        this.bookService.save(booky).subscribe(() => {});
      }
  
      this.ordersService.save(order).subscribe(order => console.log(order));
      this.snackBar.open('Your order is complete. Thank you!', '', { duration: 2000 });
      this.emptyCart();
      this.router.navigate(['/home']);
    });
    
    
  }

  getTotal() {
    let total = 0;
    this.books.forEach(book => {
      total += parseInt(book.price);
    });
    return total;
  }

}
