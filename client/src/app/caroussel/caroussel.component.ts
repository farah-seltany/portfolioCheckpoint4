import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-caroussel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.scss']
})
export class CarousselComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers()
  {
    this.userService.getUsers().subscribe(result => this.user = result[0]);
  }

}
