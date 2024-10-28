import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environments } from './environments/environment.prod';
import { PayService } from './services/pay.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Payment } from './interfaces/interface';

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
  
  title = 'pay-app';
  isAuthorized = false;

  payment: Payment = { 
    amount: 200,
    cardNumber: "1111222233334444",
    validity: "12/28",
    cardHolder: "Momentum",
    cvv: 456,
    receiptNumber: 1,
  }

  onClickedAuthorization() {
    this.payService.auth("User").subscribe(value => { if (value) { 
      this.isAuthorized = true } });
  }

  onClickedPay() {
    this.payment.operation='Pay';
    this.payService.pay(this.payment).subscribe(v=>console.log(v))

  }

  onClickedReject() {
    this.payment.operation='Reject';
    this.payService.reject(this.payment).subscribe(v=>console.log(v))
  }

}
