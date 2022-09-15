import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.actions';
import { loginStart, loginSuccess, signupStart } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action['email'], action['password']).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          }),
          catchError((errResponse) => {
            console.log(errResponse.error.error.message);
            const errMessage = this.authService.getErrorMessage(
              errResponse.error.error.message
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));

            return of(setErrorMessage({ message: errMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        map((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  signup$ = createEffect(()=>{
    return this.actions$.pipe(ofType(signupStart),exhaustMap((action)=>{
      return
    }))
  })
}
