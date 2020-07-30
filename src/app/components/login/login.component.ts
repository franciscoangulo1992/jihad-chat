import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ConfigService } from '../../services/config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public cs: ChatService) { }
  ingresar() {
    this.cs.login();
  }
}
