import { Component, OnInit } from '@angular/core';

import { Car } from './car';
import { CarService } from "./car.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cars';

  cars: Car[];
  error = '';
  success = '';

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }
  // When we subscribe to observable we expect one of three results:
  // 1.Getting the requested data from the server side (the array of cars).
  // 2.An error on the server side.
  // 3.An indication that the stream of data has finished.
  getCars(): void {
    this.carService.getAll().subscribe(
      (res: Car[]) => {
        this.cars = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
