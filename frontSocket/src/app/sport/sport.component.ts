import {
  Component,
  OnInit
} from '@angular/core';
import {
  SportService
} from '../sport.service';
import * as moment from 'moment';

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

  constructor(private sportService: SportService) {}

  ngOnInit() {
    this.getMessages()

    // this.momentTest()

    this.connection = this.sportService.messages
      .subscribe(message => {
        console.log('ngOnInit sportService:', message)
        let _d = new Date(message.createdAt),
            _date = moment(_d),
            date = _date.format("DD.MM.YYYY"),
            time = _date.format("HH:mm:ss"),
            id = this.messages.length
        let newMsg = {
          _id: message._id,
          id,
          name: message.name,
          date,
          time
        }
        // console.log(this.formatMsg(message))
        this.messages.push(newMsg)
      })
  }

  momentTest() {
    const _d = new Date(),
      _d2 = new Date('2018-05-17T13:44:50.883Z')
    console.log(_d, _d2)

    let momentDate = moment(_d),
      date = momentDate.format("DD.MM.YYYY"),
      time = momentDate.format("hh:mm:ss")

    console.log(date, time)
  }

  del(id) {
    console.log(`${id} to del`)
    this.sportService.delMsg(id)
  }

  sendMessage() {
    let time = new Date
    this.sportService.sendMsg(this.message);
    console.log(`${this.message} has sent to server at ${time}`)
    this.message = '';
  }

  getMessages() {
    this.sportService.getMsgs()
      .subscribe(message => {
        let msgs = message.json()
        console.log(msgs)
        this.messages = this.formatMsg(msgs)
        console.log(this.messages)
      })
  }

  formatMsg(oldMessage) {
    let newMsgs = oldMessage.map((val, id) => {
      let _d = new Date(val.createdAt),
        _date = moment(_d),
        date = _date.format("DD.MM.YYYY"),
        time = _date.format("HH:mm:ss")
      return {
        _id: val._id,
        id,
        name: val.name,
        date,
        time
      }
    })
    return newMsgs
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
