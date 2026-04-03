import { H as state, V as set, k as get } from "./DohVbzTv.js";
//#region src/lib/services/auth/auth.state.svelte.ts
var AuthState = class {
	#_user = state(null);
	get _user() {
		return get(this.#_user);
	}
	set _user(value) {
		set(this.#_user, value, true);
	}
	#_initialized = state(false);
	get _initialized() {
		return get(this.#_initialized);
	}
	set _initialized(value) {
		set(this.#_initialized, value, true);
	}
	get user() {
		return this._user;
	}
	get isAuthenticated() {
		return !!this._user;
	}
	get isInitialized() {
		return this._initialized;
	}
	setUser(user) {
		this._user = user;
		this._initialized = true;
	}
};
var authState = new AuthState();
//#endregion
export { authState as t };
