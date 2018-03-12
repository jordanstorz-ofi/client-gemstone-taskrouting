import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  @Input() user: User;
  @Output() login: EventEmitter<number> 
    = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  loginUser(): void {
    this.login.emit(this.user.UserId);
  }
}
