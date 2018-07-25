import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EditUserDialogComponent} from '../edit-user-dialog/edit-user-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  @Input() user: {
    firstName: '',
    lastName: ''
  }

  constructor(public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {

  }

  editProfile() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
