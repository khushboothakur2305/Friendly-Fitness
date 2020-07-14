export interface Exercise{
  id:string;
  name:string;
  duration:number;
  caloriesburnt:number;
  date?:Date;
  state?:'completed' | 'cancelled'|null;
}
