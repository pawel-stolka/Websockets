import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable()
export class SportService {
  messages: Subject<any>;
  url = environment.url

  constructor(
    private http: Http,
    private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  getMsgs() {
    let url = `${this.url}/sports`
    return this.http.get(url)
  }
}
