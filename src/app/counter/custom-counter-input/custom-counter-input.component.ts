import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { changeUserName, customIncrement } from '../state/counter.actions';
import { getUsername } from '../state/counter.selectors';
import { counterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  count: number;
  userName: string;
  // newName: string;
  newName$:Observable<string>

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select(getUsername).subscribe((data) => {
    //   this.newName = data;
    //   console.log('user name changed');
    // });

    this.newName$ = this.store.select(getUsername);
  }

  customIncrement() {
    this.store.dispatch(customIncrement({ value: +this.count }));
    console.log(this.count);
  }

  changeUserName(){
    this.store.dispatch(changeUserName())
  }
}
