import { setContext, getContext } from 'svelte';
import type { AuthService } from './auth/auth-service.interface';

const AUTH_SERVICE_KEY = Symbol('auth-service');

export function setAuthService(service: AuthService) {
  setContext(AUTH_SERVICE_KEY, service);
}

export function getAuthService(): AuthService {
  const service = getContext<AuthService>(AUTH_SERVICE_KEY);
  if (!service) {
    throw new Error('AuthService not initialized');
  }
  return service;
}
