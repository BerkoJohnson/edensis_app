import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<any>;
  image: any;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
}

