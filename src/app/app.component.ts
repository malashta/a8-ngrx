import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {CountState} from './reducers/counter/count.reducer';
import {Observable} from 'rxjs';
import {selectCount, selectUpdatedAt} from './reducers/counter/count.selectors';
import {CountClearAction, CountDecreaseAction, CountIncreaseAction} from './reducers/counter/count.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public count$: Observable<number> = this.store$.pipe(select(selectCount));
  public disableDecrease$: Observable<boolean> = this.count$.pipe(map(count => !count));
  public updatedAt$: Observable<number> = this.store$.pipe(select(selectUpdatedAt));

  constructor(private store$: Store<CountState>) {

  }

  increase() {
    this.store$.dispatch(new CountIncreaseAction());
  }
  decrease() {
    this.store$.dispatch(new CountDecreaseAction());
  }
  clear() {
    this.store$.dispatch(new CountClearAction());
  }
}
