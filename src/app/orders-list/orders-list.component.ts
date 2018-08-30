import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrdersService } from '../shared/order/orders.service';
import { BookService } from '../shared/book/book.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders = [];

  constructor(public afAuth: AngularFireAuth,
    public ordersService: OrdersService,
    private bookService: BookService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.ordersService.getAll().subscribe(orders => {
      this.orders = orders;
      
      orders.forEach(order => {
        order.booksArr = [];
        let books = order.booksId.split(';');
        books.forEach(book => {
          this.bookService.get(book).subscribe(b => {
            order.booksArr.push(b);
          });
        });
      });
    });
  }

  approve(order) {
    order.status = 'approved';
    this.ordersService.save(order).subscribe(order => {
    });
    this.snackBar.open('The order approved', null, {
      duration: 2000,
    });
  };

}
