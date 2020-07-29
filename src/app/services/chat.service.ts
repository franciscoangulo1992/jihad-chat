import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../components/interface/mensaje.interface';
import { map, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  // items: Observable<any[]>;
  public chats: Mensaje[] = [];
  constructor(private afs: AngularFirestore) { }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc'));
    return this.itemsCollection.valueChanges()
      .pipe(map((mensajes: Mensaje[]) => {
        this.chats = [];

        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      }));
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime(),
    }
    return this.itemsCollection.add(mensaje);
  }
}
