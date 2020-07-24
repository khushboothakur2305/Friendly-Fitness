import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  isLoading = false;
  LoadingSubs: Subscription;
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.LoadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
    this.fetchEcercises();
  }
  fetchEcercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startexercise(f.value.exercise);
  }
  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
