import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
export class TrainingService {

  exercisechanged=new Subject<Exercise>();
  private availabeExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, caloriesburnt: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, caloriesburnt: 15 },
    {
      id: 'side-lunges',
      name: 'Side Lunges',
      duration: 120,
      caloriesburnt: 18,
    },
    { id: 'burpees', name: 'Burpees', duration: 60, caloriesburnt: 8 },
  ];
  private runningexercise: Exercise;
  getAvailableExercises() {
    return this.availabeExercises.slice();
  }
  startexercise(selectedId: string) {
    this.runningexercise = this.availabeExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exercisechanged.next({...this.runningexercise})
  }
}
