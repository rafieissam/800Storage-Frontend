import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  currPage = 1;
  totalPages = 1;

  users: User[] = [];
  filteredUsers: User[] = [];

  searchId = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.currPage).subscribe(resp => {
      this.totalPages = resp.total_pages;
      this.users = resp.users;
      this.searchUsers();
    });
  }

  searchUsers() {
    let filtered: User[] = [];
    if (!this.searchId || this.searchId.length == 0) {
      filtered = this.users;
    } else {
      this.users.forEach(user => {
        if (user.id.toString().includes(this.searchId)) {
          filtered.push(user);
        }
      })
    }
    this.filteredUsers = filtered;
  }

  goToPage(page: number) {
    if (page == this.currPage) return;
    this.currPage = page;
    this.loadUsers();
  }

  numToArray(num: number) {
    return Array(num).fill(0)
  }
  
}
