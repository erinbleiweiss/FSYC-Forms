import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fsyc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  portals = [
    {
      "title": "Diagnostician",
      "route": "/diagnostician"
    },
    {
      "title": "Parent",
      "route": "/parent"
    },
    {
      "title": "Teacher",
      "route": "/teacher"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
