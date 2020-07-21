import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit,AfterViewInit{

  displayedColumns=['date','name','duration','caloriesburnt','state']
  dataSource=new MatTableDataSource<Exercise>();
  @ViewChild(MatSort)sort:MatSort;
  constructor(private trainingService : TrainingService) { }

  ngOnInit(){
    this.dataSource.data= this.trainingService.getCompletedorCancelledExercise();
  }
ngAfterViewInit(){
  this.dataSource.sort=this.sort;
}
doFilter(filtervalue : string){
  this.dataSource.filter= filtervalue.trim().toLowerCase();
}
}
