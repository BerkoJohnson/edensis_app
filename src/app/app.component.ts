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
  books: {
    title: string;
    pages: number;
  }[] = [
    { title: 'Book 1', pages: 120},
    { title: 'Book 2', pages: 143},
    { title: 'Book 4', pages: 450},
    { title: 'Book 3', pages: 198},
  ];

  selectedBook: string;
  constructor(public auth: AuthService) { }

  ngOnInit() {

  }
 
}

