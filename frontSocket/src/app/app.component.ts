import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit() {
    // let now = moment(); // add this 2 of 4
    // console.log('hello world', now.format()); // add this 3 of 4
    // console.log(now.add(7, 'days').format()); // add this 4of 4
  }
}
