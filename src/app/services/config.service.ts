
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  crearSesion(url: string) {
    return this.http.get(url);
  }

  enviarMensaje(url: string, params: any) {
    return this.http.post(url, params);
  }

}
