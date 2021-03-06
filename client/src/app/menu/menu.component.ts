import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { AuthService } from '../shared/auth.service';
declare var require: any;
const FileSaver = require('file-saver');


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.getUsers();
  }

  /* download()
  {
    const pdfUrl = '../../assets/CVFarahSELTANY.pdf';
    const pdfName = 'CV_Farah_Seltany';
    FileSaver.saveAs(pdfUrl, pdfName);
  } */

  getUsers()
  {
    this.userService.getUsers().subscribe(result => {
      this.user = result[0];

    });
  }

  logout()
  {
    this.userService.connectedUser = undefined;
    this.authService.logout();
  }

}
