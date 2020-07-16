import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  constructor(private trainingService: TrainingService) {}
  exercises: Exercise[] = [];
  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }
  onStartTraining(f: NgForm) {
    console.log(f.value.exercise);

    this.trainingService.startexercise(f.value.exercise);
  }
}
