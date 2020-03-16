import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BROWSER_STORAGE } from '../interfaces/storage';
import { Injectable, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storage.getItem('edensis-token')}`
      }
    });
    return next.handle(newReq);
  }
}
