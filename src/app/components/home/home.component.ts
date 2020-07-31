import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let time = 5;
    const interval = setInterval(() => {
      time--;
      if (time === 0) {
        clearInterval(interval);
        document.getElementById('WACLauncher__Button').click();
      }
    }, 1000);

  }

}
