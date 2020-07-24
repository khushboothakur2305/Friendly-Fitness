import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingtraining = false;
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (exercise) => {
        if (exercise) {
          this.ongoingtraining = true;
        } else {
          this.ongoingtraining = false;
        }
      }
    );
  }
  ngOnDestroy() {
      this.exerciseSubscription.unsubscribe();
  }
}
