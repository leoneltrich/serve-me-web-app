import { setContext, getContext } from 'svelte';
import type { AuthService } from './auth/auth-service.interface';
import type { AdminService, ServerService } from './interfaces';

const AUTH_SERVICE_KEY = Symbol('auth-service');
const ADMIN_SERVICE_KEY = Symbol('admin-service');
const SERVER_SERVICE_KEY = Symbol('server-service');

export function setAuthService(service: AuthService) { setContext(AUTH_SERVICE_KEY, service); }
export function getAuthService(): AuthService { return getContext<AuthService>(AUTH_SERVICE_KEY); }

export function setAdminService(service: AdminService) { setContext(ADMIN_SERVICE_KEY, service); }
export function getAdminService(): AdminService { return getContext<AdminService>(ADMIN_SERVICE_KEY); }

export function setServerService(service: ServerService) { setContext(SERVER_SERVICE_KEY, service); }
export function getServerService(): ServerService { return getContext<ServerService>(SERVER_SERVICE_KEY); }
