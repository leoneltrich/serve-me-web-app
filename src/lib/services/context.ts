import { getContext, setContext } from 'svelte';
import type { AuthService } from './auth/auth-service.interface';
import type { IAdminService, IServerService } from './interfaces';

const AUTH_KEY = Symbol('auth-service');
const ADMIN_KEY = Symbol('admin-service');
const SERVER_KEY = Symbol('server-service');

export function setAuthService(service: AuthService) {
  setContext(AUTH_KEY, service);
}

export function getAuthService(): AuthService {
  return getContext(AUTH_KEY);
}

export function setAdminService(service: IAdminService) {
  setContext(ADMIN_KEY, service);
}

export function getAdminService(): IAdminService {
  return getContext(ADMIN_KEY);
}

export function setServerService(service: IServerService) {
  setContext(SERVER_KEY, service);
}

export function getServerService(): IServerService {
  return getContext(SERVER_KEY);
}
