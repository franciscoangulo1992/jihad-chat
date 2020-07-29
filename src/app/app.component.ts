import { ChatService } from './services/chat.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public cs: ChatService) {

  }

  cerrarSesion() {
    this.cs.logout();

    


  }
}
