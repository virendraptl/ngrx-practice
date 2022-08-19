import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCounter } from '../state/counter.selectors';
import { counterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  // @Input() counter;
  counter$: Observable<number>;
  userName:string;
  // counter$: Observable<{ counter: number }>;

  constructor(private store: Store<{ counter: counterState }>) {}

  ngOnInit(): void {

    this.counter$ = this.store.select(getCounter)
    // .subscribe((data) => {
    //   this.counter = data;
    //   console.log('counter updated');
    // });

    // this.counter$ = this.store.select('counter');
  }
}
