import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(
      "http://localhost:7000/api/v1/users/5e63fb7900c0e53fe24e2014"
    );
  }
  getimage() {
    return this.http.get(
      "http://localhost:7000/api/v1/users/5e63fb7900c0e53fe24e2014/userphoto"
    );
  }
}
