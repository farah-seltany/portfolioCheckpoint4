import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-changement',
  templateUrl: './confirmation-changement.component.html',
  styleUrls: ['./confirmation-changement.component.scss']
})
export class ConfirmationChangementComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationChangementComponent>, private router : Router) { }

  ngOnInit() {
  }

  close()
  {
    this.dialogRef.close();
    this.router.navigateByUrl('admin')
  }

}
