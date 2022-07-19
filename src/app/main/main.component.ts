import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, observable, Subject, } from 'rxjs';
import { map, debounceTime, bufferCount, filter, delay, buffer, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  constructor() { }
  
  seconds: number = 0;
  minutes: number = 0;
  startTimer: any;
  running = false;
  delayTime = 500;

  ngOnInit(): void {
    let clicks$ = fromEvent(document, 'click');

    clicks$
      .pipe(
        buffer(clicks$.pipe(throttleTime(this.delayTime))),
        filter(clickArray => clickArray.length >= 2)
      ) 

    const waitStopwatch$ = new Observable(
      observer => {
        const waitStopwatch = document.getElementById("run");

        waitStopwatch?.addEventListener(
          'click', 
          event => {
            observer.next(event);
          }
        )
      }
    )

    const startStopwatch$ = new Observable(
      observer => {
        const startStopwatch = document.getElementById("run");

        startStopwatch?.addEventListener(
          'click', 
          event => {
            observer.next(event);
          }
        )
      }
    )
  
    const resetStopwatch$ = new Observable(
      observer => {
        const resetStopwatch = document.getElementById("reset");

        resetStopwatch?.addEventListener(
          'click', 
          event => {
            observer.next(event);
          }
        )
      }
    )
    
    startStopwatch$.pipe(
      buffer(
        clicks$.pipe(
          debounceTime(
            this.delayTime
          )
        )
      ), 
      filter(clickArray => clickArray.length == 1)
    ).subscribe(
      value => {
        if (!this.running) {
              this.running = true;

              this.startTimer = setInterval(
                () => {
                  this.seconds++;

                  if(this.seconds === 60){
                    this.minutes++;
                    this.seconds = 0;
                  }
                }, 
                1000
              );
        } else{
          clearInterval(this.startTimer);
          this.running = false;
          this.minutes = 0;
          this.seconds = 0;
        }
      }
    ) 

    resetStopwatch$.subscribe(
      () => {
        clearInterval(this.startTimer);
        this.running = false;
        this.minutes = 0;
        this.seconds = 0;

        if (!this.running) {
          this.running = true;

          this.startTimer = setInterval(
            () => {
              this.seconds++;

              if (this.seconds === 60) {
                this.minutes++;
                this.seconds = 0;
              }
            }, 
            1000
          );
        } else {
          clearInterval(this.startTimer);
          this.running = false;
          this.minutes = 0;
          this.seconds = 0;
        }
      }
    )

    waitStopwatch$.pipe(
      buffer(clicks$.pipe(debounceTime(this.delayTime))),
      filter(clickArray => clickArray.length >= 2)
    ).subscribe(
      value => {
        clearInterval(this.startTimer);
        this.running = false;
      }
    )
  }
}