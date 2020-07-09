import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  maxDate;
  constructor() {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setfullyear(this.maxDate.getfullyear() - 18);
  }
  onsubmit(form: NgForm) {
    console.log(form);
  }
}
