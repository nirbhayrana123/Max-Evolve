import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ConnectionService } from '../../services/connection.service'; 

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})

export class CalculatorComponent implements OnInit {

  




  futureValueForm = new FormGroup({
    presentValue: new FormControl('', [Validators.required]),
    payment: new FormControl('', [Validators.required]),
    interestRate: new FormControl('', [Validators.required]),
    periods: new FormControl('', [Validators.required]),
    compoundInterest: new FormControl('', [Validators.required]),
  });

  presentValueForm = new FormGroup({
    futureValue: new FormControl('', [Validators.required]),
    payment: new FormControl('', [Validators.required]),
    interestRate: new FormControl('', [Validators.required]),
    periods: new FormControl('', [Validators.required]),
    compoundInterest: new FormControl('', [Validators.required]),
  });

  paymentForm = new FormGroup({
    presentValue: new FormControl('', [Validators.required]),
    futureValue: new FormControl('', [Validators.required]),
    interestRate: new FormControl('', [Validators.required]),
    periods: new FormControl('', [Validators.required]),
    compoundInterest: new FormControl('', [Validators.required]),
  });

  rateForm = new FormGroup({
    presentValue: new FormControl('', [Validators.required]),
    futureValue: new FormControl('', [Validators.required]),
    periods: new FormControl('', [Validators.required]),
    compoundInterest: new FormControl('', [Validators.required]),
  });

  periodsForm = new FormGroup({
    presentValue: new FormControl('', [Validators.required]),
    futureValue: new FormControl('', [Validators.required]),
    interestRate: new FormControl('', [Validators.required]),
    compoundInterest: new FormControl('', [Validators.required]),
  });

  compoundInterestArray: Number[] = [];
  principalArray: Number[] = [];
  years: Number[] = [];
  periodCounter: Number[] = [];
  periodTotal: Number[] = [];

  presentVal = 0;
  sumCompoundInterest = 0;
  totalInterest = 0;
  interest = 0;
  principal = 0;
  totalPrincipal = 0;
  time = 0;
  rate = 0;
  n = 0;
  periodCount = 0;
  principalOne = 0;

  tabType = 'future';
  previousUrl: string = '';
  currentUrl: string = '';

  constructor(private router: Router, private urlService: ConnectionService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.urlService.setPreviousUrl(this.previousUrl);
      });
  }

  FutureValue = () => {
    if (this.futureValueForm.invalid) {
      return;
    }
    this.tabType = 'future';
    this.principal = Number(this.futureValueForm.controls.presentValue.value);
    this.time = Number(this.futureValueForm.controls.periods.value);
    this.rate = Number(this.futureValueForm.controls.interestRate.value) / 100;
    this.n = Number(this.futureValueForm.controls.compoundInterest.value);

    for (
      let i = 0;
      i < Number(this.futureValueForm.controls.periods.value);
      i++
    ) {
      this.time = 1;
      this.principalArray.push(this.principal);
      this.years.push(i + 1);
      let compVal: number = 0;
      compVal = this.compoundInterest(
        this.principal,
        this.time,
        this.rate,
        this.n
      );
      this.sumCompoundInterest = this.sumCompoundInterest + compVal;
      this.compoundInterestArray.push(this.sumCompoundInterest);
      this.principal += Number(this.futureValueForm.controls.payment.value);
      this.interest = Number(
        this.compoundInterestArray[this.compoundInterestArray.length - 1]
      );
      this.totalInterest =
        Number(
          this.compoundInterestArray[this.compoundInterestArray.length - 1]
        ) + this.principal;
    }
  };

  get f() {
    return this.futureValueForm.controls;
  }

  PresentValue = () => {
    this.tabType = 'present';

    if (this.presentValueForm.invalid) {
      return;
    }
    let interestPercentage =
      Number(this.presentValueForm.controls.interestRate.value) / 100;
    this.principal = Math.abs(
      this.pv(
        interestPercentage,
        Number(this.presentValueForm.controls.periods.value),
        Number(this.presentValueForm.controls.payment.value),
        -Number(this.presentValueForm.controls.futureValue.value)
      )
    );
    this.presentVal = this.principal;
    this.time = Number(this.presentValueForm.controls.periods.value);
    this.rate = Number(this.presentValueForm.controls.interestRate.value) / 100;
    this.n = Number(this.presentValueForm.controls.compoundInterest.value);
    this.sumCompoundInterest = 0;
    for (
      let i = 0;
      i < Number(this.presentValueForm.controls.periods.value);
      i++
    ) {
      this.interest = 0;
      this.time = 1;
      let compVal = this.compoundInterest(
        this.principal,
        this.time,
        this.rate,
        this.n
      );
      this.sumCompoundInterest += compVal;
      this.compoundInterestArray.push(this.sumCompoundInterest);
      let payVal = Number(this.presentValueForm.controls.payment.value);
      this.principal += payVal;
      this.interest = Number(
        this.compoundInterestArray[this.compoundInterestArray.length - 1]
      );
      this.totalInterest =
        Number(
          this.compoundInterestArray[this.compoundInterestArray.length - 1]
        ) + this.principal;
    }
  };

  get pr() {
    return this.presentValueForm.controls;
  }

  PaymentValue = () => {
    this.tabType = 'paymnent';

    if (this.paymentForm.invalid) {
      return;
    }
    // Find PMT With New Formula
    let step1 = Math.pow(
      1 + Number(this.paymentForm.controls.interestRate.value),
      Number(this.paymentForm.controls.periods.value)
    );
    let step2 = step1 - 1;
    let step3 = step2 / Number(this.paymentForm.controls.interestRate.value);
    let step4 =
      Number(this.paymentForm.controls.futureValue.value) -
      Number(this.paymentForm.controls.presentValue.value) * step1;
    let step5 = step4 / step3;
    // Find PMT With New Formula

    this.principal = Number(this.paymentForm.controls.presentValue.value);
    this.time = Number(this.paymentForm.controls.periods.value);
    this.rate = Number(this.paymentForm.controls.interestRate.value) / 100;
    this.n = Number(this.paymentForm.controls.compoundInterest.value);

    let ir = Number(this.paymentForm.controls.interestRate.value) / 100 / 12;
    let np = Number(this.paymentForm.controls.periods.value) * 12;
    let pv_value = Number(this.paymentForm.controls.presentValue.value);
    let CheckPmt = this.PMT(
      ir,
      np,
      pv_value,
      Number(this.paymentForm.controls.futureValue.value),
      0
    );

    for (let i = 0; i < Number(this.paymentForm.controls.periods.value); i++) {
      this.time = 1;
      this.years.push(i + 1);
      this.principalArray.push(this.principal);
      this.sumCompoundInterest += this.compoundInterest(
        this.principal,
        this.time,
        step5 / 100,
        this.rate
      );
      this.compoundInterestArray.push(this.sumCompoundInterest);
      this.principal += this.PMT(
        Number(this.paymentForm.controls.interestRate.value) / 100,
        Number(this.paymentForm.controls.periods.value) * 12,
        Number(this.paymentForm.controls.presentValue.value),
        0,
        0
      );
    }
  };

  get pf() {
    return this.paymentForm.controls;
  }

  rateValue = () => {
    this.tabType = 'rate';

    if (this.rateForm.invalid) {
      return;
    }
    let step1 =
      Number(this.rateForm.controls.futureValue.value) /
      Number(this.rateForm.controls.presentValue.value);
    let step2 = 1 / Number(this.rateForm.controls.periods.value);
    let step3 = Math.pow(step1, step2);
    let step4 = step3 - 1;
    let step5 = step4 * 100;
    this.principalOne = step5;
    this.totalInterest =
      Number(this.rateForm.controls.futureValue.value) -
      Number(this.rateForm.controls.presentValue.value);
    this.principal = Number(this.rateForm.controls.presentValue.value);

    for (let i = 0; i < Number(this.rateForm.controls.periods.value); i++) {
      this.time = 1;
      this.years.push(i + 1);
      this.principalArray.push(
        Number(this.rateForm.controls.presentValue.value)
      );
      this.sumCompoundInterest += this.compoundInterest(
        this.principal,
        this.time,
        step5 / 100,
        Number(this.rateForm.controls.compoundInterest.value)
      );
      this.compoundInterestArray.push(this.sumCompoundInterest);
      this.principal += this.sumCompoundInterest;
    }
  };

  get rv() {
    return this.rateForm.controls;
  }

  peroidValue = () => {
    this.tabType = 'period';

    if (this.periodsForm.invalid) {
      return;
    }
    let totalInterestPeriod = 0;
    this.periodCount = 0;
    let principle: Number[] = [];
    for (let i = 0; i < 150; i++) {
      let totalTempValue =
        Number(this.periodsForm.controls.presentValue.value) +
        totalInterestPeriod;
      totalInterestPeriod +=
        totalTempValue *
        (Number(this.periodsForm.controls.interestRate.value) / 100);
      principle.push(totalInterestPeriod);
      this.periodTotal.push(
        totalInterestPeriod +
          Number(this.periodsForm.controls.presentValue.value)
      );
      this.periodCounter.push(this.periodCount);
      if (
        totalTempValue >= Number(this.periodsForm.controls.futureValue.value)
      ) {
        break;
      }
      this.periodCount++;
    }
  };

  get periodV() {
    return this.periodsForm.controls;
  }

  compoundInterest = (p: any, t: any, r: any, n: any) => {
    let amount = p * Math.pow(1 + r / n, n * t);
    let interest = amount - p;
    return interest;
  };

  pv = (rate: any, nper: any, pmt: any, fv: any) => {
    let pv_value = 0;
    rate = parseFloat(rate);
    nper = parseFloat(nper);
    pmt = parseFloat(pmt);
    fv = parseFloat(fv);

    if (rate == 0) {
      // Interest rate is 0
      pv_value = -(fv + pmt * nper);
    } else {
      let x = Math.pow(1 + rate, -nper);
      let y = Math.pow(1 + rate, nper);
      pv_value = -(x * (fv * rate - pmt + y * pmt)) / rate;
    }
    //pv_value = (pv_value);
    return pv_value;
  };

  PMT = (rate: any, nper: any, pv: any, fv: any, type: any) => {
    fv || (fv = 0);
    type || (type = 0);

    if (rate === 0) return -(pv + fv) / nper;

    let pvif = Math.pow(1 + rate, nper);
    let pmt = (-rate * (pv * pvif + fv)) / (pvif - 1);

    if (type === 1) pmt /= 1 + rate;
    return pmt;
  };

  reset = () => {
    this.principal = 0;
    this.totalInterest = 0;
    this.compoundInterestArray = [];
    this.interest = 0;
    this.sumCompoundInterest = 0;
  };

  formReset = (type: string) => {
    switch (type) {
      case 'future':
        this.futureValueForm.reset();
        break;

      case 'present':
        this.presentValueForm.reset();
        break;

      case 'payment':
        this.paymentForm.reset();
        break;

      case 'rate':
        this.rateForm.reset();
        break;
      case 'period':
        this.periodsForm.reset();
        break;
    }
  };
}