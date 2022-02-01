import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<User>(`${environment.API_URL}/api/user`)
      .subscribe((res) => console.log('dashboard teste for authentication: ', res));
  }
}
