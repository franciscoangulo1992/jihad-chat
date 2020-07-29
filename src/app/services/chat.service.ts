import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../components/interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public usuario: any = {};
  public chats: Mensaje[] = [];
  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) {



    this.auth.authState.subscribe(user => {
      console.log('estado del usuario', user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;


    });
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc'));
    return this.itemsCollection.valueChanges()
      .pipe(map((mensajes: Mensaje[]) => {
        this.chats = [];

        for (const mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      }));
  }

  agregarMensaje(texto: string, nombre?: string, uid?: string) {
    const mensaje: Mensaje = {
      nombre: nombre ? "Jihad" : this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: uid ? uid : this.usuario.uid

    };
    return this.itemsCollection.add(mensaje);
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.auth.signOut();
    console.log('Sesión Cerrada !');
  }
}
