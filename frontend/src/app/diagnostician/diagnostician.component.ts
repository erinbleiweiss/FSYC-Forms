import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'fsyc-diagnostician',
  templateUrl: './diagnostician.component.html',
  styleUrls: ['./diagnostician.component.css']
})
export class DiagnosticianComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.authService.googleInit(document.getElementById('googleBtn'));
  }

}
