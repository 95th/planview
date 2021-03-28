import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pv-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  links: { url: string; label: string }[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.links = [
      { url: 'dashboard', label: 'Home' },
      { url: 'timesheet', label: 'Timesheet' },
      { url: 'send-message', label: 'Message' },
    ];

    if (this.auth.isAdmin()) {
      this.links.push({ url: 'admin/dashboard', label: 'Admin Dashboard' });
      this.links.push({
        url: 'admin/create-work/type',
        label: 'Work Type',
      });
      this.links.push({
        url: 'admin/create-work/item',
        label: 'Work Item',
      });
      this.links.push({
        url: 'admin/create-work/assignment',
        label: 'Work Assignment',
      });
    }
  }

  async logout() {
    this.auth.logoutUser();
    await this.router.navigateByUrl('/login');
  }
}
