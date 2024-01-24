import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  constructor(private http: HttpClient) {}

  userInfoFromSS: any;

  ngOnInit(): void {
    this.userInfoFromSS = JSON.parse(
      sessionStorage.getItem('loggedInUser') as string
    );

    this.http
      .post(
        'http://localhost:8000/register-googleuser',
        {
          email: this.userInfoFromSS.email,
        },
        { withCredentials: true }
      )
      .subscribe((response: any) => {
        if (response.status !== 200) {
          console.error(response);
          return;
        }
      });
  }
}
