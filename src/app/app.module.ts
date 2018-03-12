import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';

import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { TaskRouterService } from './task-router.service';
import { SingleUserComponent } from './single-user/single-user.component';
import { GemstoneGlanceComponent } from './gemstone-glance/gemstone-glance.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SingleUserComponent,
    GemstoneGlanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    UserService,
    TaskRouterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
