import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environments } from './environments/environment.prod';
import { PayService } from './services/pay.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public payService: PayService) {

  }
  isAutorized = false;
  onAutorize() {

    this.payService.auth("user").subscribe(value => { if (value) { this.isAutorized = true } });

    console.log("onAutorize");
  }
  onClicked2() {
    console.log("2");
  }
  onClicked3() {
    console.log("3");
  }
  title = 'pay-app';
}
