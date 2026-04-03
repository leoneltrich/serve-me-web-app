import { G as getContext, J as setContext } from "./DohVbzTv.js";
//#region src/lib/services/context.ts
var AUTH_KEY = Symbol("auth-service");
var ADMIN_KEY = Symbol("admin-service");
var SERVER_KEY = Symbol("server-service");
var HEALTH_KEY = Symbol("health-service");
function setAuthService(service) {
	setContext(AUTH_KEY, service);
}
function getAuthService() {
	return getContext(AUTH_KEY);
}
function setAdminService(service) {
	setContext(ADMIN_KEY, service);
}
function getAdminService() {
	return getContext(ADMIN_KEY);
}
function setServerService(service) {
	setContext(SERVER_KEY, service);
}
function getServerService() {
	return getContext(SERVER_KEY);
}
function setHealthService(service) {
	setContext(HEALTH_KEY, service);
}
function getHealthService() {
	return getContext(HEALTH_KEY);
}
//#endregion
export { setAdminService as a, setServerService as c, getServerService as i, getAuthService as n, setAuthService as o, getHealthService as r, setHealthService as s, getAdminService as t };
