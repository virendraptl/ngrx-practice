import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<authState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.user ? true : false;
});
