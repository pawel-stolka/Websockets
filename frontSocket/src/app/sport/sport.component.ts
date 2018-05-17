import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';

@Component({
  selector: 'sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  name = 'Sport'
  connection
  messages = []
  message

  constructor(private sportService: SportService) { }

  ngOnInit() {
    this.getMessages()

    this.connection = this.sportService.messages
      .subscribe(message => {
        console.log('ngOnInit sportService:', message)
        this.messages.push(message)
      })
  }

  sendMessage(){
    let time = new Date
    this.sportService.sendMsg(this.message);
    console.log(`${this.message} has sent to server at ${time}`)
    this.message = '';
  }

  getMessages() {
    this.sportService.getMsgs()
      .subscribe(message => {
        this.messages = message.json()
      })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
