import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../interfaces/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Authresponse } from '../interfaces/authresponse';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  image: any;
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient,
    private router: Router
  ) {
   }

  public getToken(): string {
    return this.storage.getItem('edensis-token');
  }

  public saveToken(token: string) {
    return this.storage.setItem('edensis-token', token);
  }

  public fetchImage(): Observable<User> {
    if (this.isLoggedIn()) {
      return this.http.get<User>(`/api/v1/users/${this.getCurrentUser()?._id}/userphoto`).pipe(
        tap(_ => this.image = _.image)
      );
    }
  }

  public login(user: User): Observable<Authresponse> {
    return this.http.post<Authresponse>('/api/v1/auth/login', user)
      .pipe(
        tap(res => {
          this.saveToken(res.token);
        })
      );
  }

  public logout(): void {
    this.storage.removeItem('edensis-token');
    this.router.navigateByUrl('/login');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { _id, email, name } = JSON.parse(atob(token.split('.')[1]));
      return { _id, email, name } as User;
    }
  }
}
