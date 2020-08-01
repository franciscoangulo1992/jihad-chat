import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let clicked = false;
    let time = 5;
    if (clicked === false) {
      const interval = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(interval);
          document.getElementById('WACLauncher__Button').click();
          clicked = true;
        }
      }, 1000);

    }

  }

}
