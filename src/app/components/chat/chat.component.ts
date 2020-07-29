import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje = '';
  elemento: any;
  constructor(public cs: ChatService) {

    this.cs.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });

  }
  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }
  enviar_mensaje() {

    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    this.cs.agregarMensaje(this.mensaje).then(() => console.log('envio correcto'))
      .catch((error) => console.error('error al enviar', error));
    this.mensaje = "";
  }

}
