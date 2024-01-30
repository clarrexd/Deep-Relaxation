import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

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
  userOrders: any;
  userId: any;

  //Fetch the users id in the users table by matching it with their email (email is unique)
  getUserId(): Observable<any> {
    return this.http
      .post(
        'http://localhost:8000/get-user-id',
        { email: this.userInfoFromSS.email },
        { withCredentials: true }
      )
      .pipe(
        map((response: any) => response.id) // Extract id to avoid an array with objects
      );
  }

  //Fetch the logged in users orders
  getUserOrders() {
    this.getUserId()
      .pipe(
        switchMap((response: any) => {
          this.userId = response;
          return this.http.post(
            'http://localhost:8000/get-user-orders',
            { id: this.userId },
            { withCredentials: true }
          );
        }),
        catchError((error) => {
          console.error(error);
          return of(null); // Gives default value or null on error
        })
      )
      .subscribe((ordersResponse: any) => {
        if (ordersResponse !== null) {
          this.userOrders = ordersResponse;
        }
      });
  }

  ngOnInit(): void {
    this.userInfoFromSS = JSON.parse(
      sessionStorage.getItem('loggedInUser') as string
    );

    //Register a user logged in with google to the users table with their email
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

    this.getUserOrders();
  }
}
