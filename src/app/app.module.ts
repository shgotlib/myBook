import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { BookService } from './shared/book/book.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { BookListComponent } from './book-list/book-list.component';
import { 
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule, 
  MatSnackBarModule,
  MatGridListModule,
  MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookEditComponent } from './book-edit/book-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { AuthService } from './shared/auth/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BookComponent, DialogTemplate } from './book/book.component';
import { UsersListComponent } from './users-list/users-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { UsersService } from './shared/user/users.service';
import { OrdersService } from './shared/order/orders.service';
import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'book/:id',
    component: BookComponent
  },
  {
    path: 'book-list',
    component: BookListComponent
  },
  {
    path: 'book-add',
    component: BookEditComponent
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
];

const firebaseConfig = {
  apiKey: "AIzaSyC4wuVBb_IicuM7Byand9NU9KM_nSwJxLU",
  authDomain: "mybook-fb852.firebaseapp.com",
  databaseURL: "https://mybook-fb852.firebaseio.com",
  projectId: "mybook-fb852",
  storageBucket: "",
  messagingSenderId: "496956052245"
};


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookEditComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    BookComponent,
    DialogTemplate,
    UsersListComponent,
    OrdersListComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, 'mybook'),
    AngularFireAuthModule,
  ],
  providers: [
    BookService,
    AuthService,
    UsersService,
    OrdersService
  ],
  entryComponents: [DialogTemplate],
  bootstrap: [AppComponent]
})
export class AppModule { }
