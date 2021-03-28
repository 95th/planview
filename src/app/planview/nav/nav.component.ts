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
      { label: 'Home', url: 'dashboard' },
      { label: 'Timesheet', url: 'timesheet' },
      { label: 'Message', url: 'send-message' },
    ];

    if (this.auth.isAdmin()) {
      this.links.push({ label: 'Admin Dashboard', url: 'admin/dashboard' });
      this.links.push({
        label: 'Work Type',
        url: 'admin/create-work/type',
      });
      this.links.push({
        label: 'Work Item',
        url: 'admin/create-work/item',
      });
      this.links.push({
        label: 'Work Assignment',
        url: 'admin/create-work/assignment',
      });
    }
  }

  async logout() {
    this.auth.logoutUser();
    await this.router.navigateByUrl('/login');
  }
}
