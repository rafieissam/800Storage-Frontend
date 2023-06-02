import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  id?: string;
  user?: User;

  items = [
    { title: "ID", key: "id" },
    { title: "First Name", key: "first_name" },
    { title: "Last Name", key: "last_name" },
    { title: "Email", key: "email" },
  ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.loadUser();
    })
  }

  loadUser() {
    if (!this.id) return;
    this.userService.getUser(+this.id).subscribe(resp => {
      this.user = resp;
    });
  }

  getUserItem(key: string) {
    return (this.user as any)[key];
  }
  
}
