import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';

import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { SingleUserComponent } from './single-user/single-user.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SingleUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
