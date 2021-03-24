import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pv-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  loading: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'admin', 'locked'];
  users: User[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.reload();
  }

  async reload() {
    this.loading = true;
    this.users = await this.auth.getUsers();
    this.loading = false;
  }
}
