import { Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UiService } from 'src/app/shared/ui.service';
@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbsub: Subscription[] = [];
  private availabeExercises: Exercise[] = [];
  private runningexercise: Exercise;

  constructor(private db: AngularFirestore, private uiService: UiService) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbsub.push(
      this.db
        .collection('AvailableExercise')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as Exercise),
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availabeExercises = exercises;
            this.exercisesChanged.next([...this.availabeExercises]);
          },
          (error) => {
            this.uiService.showSnackbar(
              'Fetching exercises failed , please try again later',
              null,
              3000
            );

            this.exercisesChanged.next(null);
          }
        )
    );
  }
  startexercise(selectedId: string) {
    this.runningexercise = this.availabeExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningexercise });
  }
  completeExercise() {
    this.addDataToDatabase({
      ...this.runningexercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningexercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningexercise,
      duration: this.runningexercise.duration * (progress / 100),
      caloriesburnt: this.runningexercise.caloriesburnt * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningexercise = null;
    this.exerciseChanged.next(null);
  }
  getRunnibgExercise() {
    return { ...this.runningexercise };
  }
  fetchCompletedorCancelledExercise() {
    this.fbsub.push(
      this.db
        .collection('FinishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }
  cancelSubscription() {
    this.fbsub.forEach((sub) => sub.unsubscribe());
  }
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('FinishedExercises').add(exercise);
  }
}
