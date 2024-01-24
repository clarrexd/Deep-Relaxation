import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  constructor() {}

  userInfoFromSS: any = [];

  ngOnInit(): void {
    this.userInfoFromSS = JSON.parse(
      sessionStorage.getItem('loggedInUser') as string
    );
  }
}
