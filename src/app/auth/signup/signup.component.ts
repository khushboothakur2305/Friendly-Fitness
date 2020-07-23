import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit ,OnDestroy{
  maxDate;
  isLoading=false;
  LoadingSubs:Subscription;
  constructor(private AuthService : AuthService,private uiService:UiService) {}

  ngOnInit(): void {
    this.LoadingSubs=this.uiService.loadingStateChanged.subscribe(isLoading=>{
      this.isLoading=isLoading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 14);
  }
  onsubmit(form: NgForm) {
    this.AuthService.registeruser({
      email:form.value.email,
      password:form.value.password
    })
  }
  ngOnDestroy(){
    this.LoadingSubs.unsubscribe();
  }
}
