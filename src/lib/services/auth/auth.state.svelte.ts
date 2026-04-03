import { type User } from './auth.types';

export class AuthState {
  private _user = $state<User | null>(null);
  private _initialized = $state(false);

  get user() { return this._user; }
  get isAuthenticated() { return !!this._user; }
  get isInitialized() { return this._initialized; }

  setUser(user: User | null) {
    this._user = user;
    this._initialized = true;
  }
}

// Global singleton for the app state
export const authState = new AuthState();
