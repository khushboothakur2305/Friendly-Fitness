import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() closesidenav = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }
  sidenavclose() {
    this.closesidenav.emit();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
