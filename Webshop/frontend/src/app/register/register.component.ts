import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FontAwesomeModule,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(library: FaIconLibrary, private http: HttpClient) {}

  faUser = faUser;
  faLock = faLock;

  registerUser(username: string, password: string, email: string) {
    this.http
      .post('http://localhost:8000/register-user', {
        username: username,
        password: password,
        email: email,
      })
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  test() {
    //test function for commit
  }

  ngOnInit(): void {
    // console.log(this.registerUser('clarre', 'hehe', 'aa@okej'));
  }
}
