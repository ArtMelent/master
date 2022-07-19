import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  
  title = 'stopwatch';
}
