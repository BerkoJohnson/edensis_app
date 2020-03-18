import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HistoryService } from '../services/history.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private history: HistoryService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    if (!this.f.email || !this.f.password) {
      this.errors = 'All fields are required';
    } else {
      this.auth
        .login({ email: this.f.email, password: this.f.password })
        .subscribe(p => {
          this.router.navigateByUrl(this.history.getPreviousUrl());
        }, (error: HttpErrorResponse) => {
          this.errors = error.error.message;
        });
    }
  }

  get f() {
    return this.loginForm.value;
  }
}
