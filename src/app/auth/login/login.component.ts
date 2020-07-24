import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  LoadingSubs: Subscription;
  constructor(private AuthService: AuthService, private uiService: UiService) {}

  ngOnInit() {
    this.LoadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }
  onlogin(form: NgForm) {
    this.AuthService.Login({
      email: form.value.email,
      password: form.value.password,
    });
  }
  ngOnDestroy() {
      this.LoadingSubs.unsubscribe();
  }
}
