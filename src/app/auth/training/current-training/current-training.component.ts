import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() exitTraining = new EventEmitter();
  progress = 0;
  timer: number;
  completed = 'Keep on going , you can do it !!!';
  resume = 'stop';
  constructor(private Dialog: MatDialog) {}

  ngOnInit() {
    this.startorresume();
  }
  startorresume() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.completed = 'Congratulations You Completeds the Exercise !!!';
        this.resume = 'Completed';
      }
    }, 1000);
  }
  stop() {
    clearInterval(this.timer);
    const dialogRef = this.Dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.exitTraining.emit();
      } else {
        this.startorresume();
      }
    });
  }
}
