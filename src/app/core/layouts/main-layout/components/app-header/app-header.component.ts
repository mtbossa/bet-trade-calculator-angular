import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  isMenuOpen = false;
  userEmail?: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => (this.userEmail = user?.email));
  }

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
