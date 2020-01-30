import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser()
  {
    this.userService.getUsers().subscribe(result => this.user = result[0]);
  }

}
