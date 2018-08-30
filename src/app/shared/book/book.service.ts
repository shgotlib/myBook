import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookService {
  public API = 'http://localhost:8080';
  public BOOK_API = this.API + '/books';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/all-books');
  }

  get(id: string) {
    return this.http.get(this.BOOK_API + '/' + id);
  }

  save(book: any): Observable<any> {
    let result: Observable<Object>;
    if (book['href']) {
      result = this.http.put(book.href, book);
    } else {
      result = this.http.post(this.BOOK_API, book);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
