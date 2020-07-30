import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  respuestaJihab: any;
  inicioWatson = false;
  nombre = '';
  mensaje = '';
  elemento: any;
  SesionWatson: any = null;
  urlCreateSesion = 'https://getstartedpython-unexpected-platypus-qj.mybluemix.net/api/crear_sesion';
  urlenviarMensaje = 'https://getstartedpython-unexpected-platypus-qj.mybluemix.net/api/enviar_mensaje';


  constructor(public cs: ChatService, public watsonService: ConfigService) {

    this.cs.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });

  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');

    this.watsonService.crearSesion(this.urlCreateSesion).subscribe((res: any) => {
      this.SesionWatson = JSON.parse(res);

      this.enviar_mensaje_jihad();

    });
  }

  enviar_mensaje() {
    if (this.mensaje.length === 0) {
      return;
    }
    console.log(this.mensaje);

    if (this.mensaje === '') {
      console.log('enviado a jihad por primera vez');
      this.enviar_mensaje_jihad(this.mensaje);
    } else {
      this.enviar_mensaje_jihad(this.mensaje);



    }
    this.cs.agregarMensaje(this.mensaje, this.nombre).then(() => {
    })
      .catch((error) => console.error('error al enviar', error));
    this.mensaje = "";
  }

  enviar_mensaje_jihad(mensajeJihad: string = "") {
    return this.watsonService.enviarMensaje(this.urlenviarMensaje, {
      mensaje: mensajeJihad,
      session_id: this.SesionWatson.session_id
    }).subscribe((res: any) => {
      this.respuestaJihab = res;
      if (this.inicioWatson === false) {
        this.cs.agregarMensaje(this.respuestaJihab.output.generic[0].text, "Jihad", "Jihad")
          // .then(() => console.log('se ha iniciado '))
          .catch((error) => console.error('error al enviar', error));
        this.cs.agregarMensaje(this.respuestaJihab.output.generic[1].text, "Jihad", "Jihad")
          // .then(() => console.log('Watson correctament'))
          .catch((error) => console.error('error al enviar', error));
        return this.inicioWatson = true;
      } else {
        this.cs.agregarMensaje(this.respuestaJihab.output.generic[0].text, "Jihad", "Jihad").then(() => console.log('recepcion de jihad'))
          .catch((error) => console.error('error al enviar', error));
      }
    });
  }



}
