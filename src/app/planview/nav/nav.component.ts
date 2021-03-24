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
      { url: 'send-message', label: 'New Message' },
    ];

    if (this.auth.isAdmin()) {
      this.links.push({ url: 'admin/dashboard', label: 'Admin Dashboard' });
      this.links.push({ url: 'work/create/type', label: 'Create Work Type' });
      this.links.push({ url: 'work/create/item', label: 'Create Work Item' });
      this.links.push({
        url: 'work/create/assignment',
        label: 'Create Work Assignment',
      });
    }
  }

  async logout() {
    await this.auth.logoutUser();
    await this.router.navigateByUrl('/login');
  }
}
