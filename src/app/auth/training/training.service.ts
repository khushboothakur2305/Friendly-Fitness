import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
export class TrainingService {
  exercisechanged = new Subject<Exercise>();
  private availabeExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, caloriesburnt: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, caloriesburnt: 15 },
    { id: 'side-lunges',name: 'Side Lunges',duration: 120,caloriesburnt: 18,},
    { id: 'burpees', name: 'Burpees', duration: 60, caloriesburnt: 8 },
  ];
  private runningexercise: Exercise;
  private exercises: Exercise[]=[];
  getAvailableExercises() {
    return this.availabeExercises.slice();
  }
  startexercise(selectedId: string) {
    this.runningexercise = this.availabeExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exercisechanged.next({ ...this.runningexercise });
  }
  completeExercise(){
    this.exercises.push({...this.runningexercise,date:new Date(),state:'completed'});
    this.runningexercise=null;
    this.exercisechanged.next(null);
  }
  cancelExercise(progress:number){
    this.exercises.push(
      {...this.runningexercise,
        duration:this.runningexercise.duration*(progress/100),
        caloriesburnt:this.runningexercise.caloriesburnt*(progress/100),
        date:new Date(),
        state:'cancelled'
      });
    this.runningexercise=null;
    this.exercisechanged.next(null);
  }
getRunnibgExercise(){
  return {...this.runningexercise};
}
getCompletedorCancelledExercise(){
  return this.exercises.slice();
}
}
