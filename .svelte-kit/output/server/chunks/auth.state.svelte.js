import "./server.js";
//#region src/lib/services/auth/auth.state.svelte.ts
var AuthState = class {
	_user = null;
	_initialized = false;
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
