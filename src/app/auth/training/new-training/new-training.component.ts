import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  exercises: Exercise[] = [];

  ngOnInit(): void {
    this.db
      .collection('AvailableExercise')
      .valueChanges()
      .subscribe((result) => {
        console.log(result);
      });
  }

  onStartTraining(f: NgForm) {
    console.log(f.value.exercise);

    this.trainingService.startexercise(f.value.exercise);
  }
}
