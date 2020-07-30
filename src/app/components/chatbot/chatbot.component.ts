import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  constructor(public cs: ChatService) { }


  cerrarSesion() {
    this.cs.logout();

  }

}
