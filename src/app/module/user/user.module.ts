import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';

import { UserService } from '../../service/user.service';

import { UserComponent } from './user.component';
import { BsModalService } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    UserRoutingModule,
    UserComponent
  ],
  providers: [
    UserService,
    BsModalService
  ]
})
export class UserModule { }
