import type { User } from './auth.types';

export interface AuthService {
  login(username: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
