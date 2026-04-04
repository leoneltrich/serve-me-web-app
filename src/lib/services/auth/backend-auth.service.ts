import type {ApiClient} from '../api/api-client.interface';
import type {AuthService} from './auth-service.interface';
import type {User} from './auth.types';
import {BaseService} from '../base.service';

export class BackendAuthService extends BaseService implements AuthService {
  constructor(client: ApiClient) {
    super(client);
  }

  async login(username: string, password: string): Promise<User> {
    const data = await this.post<User>('/auth/login', {
      username,
      password,
    });

    // Combine username from the login request with any other data returned
    return {...data, username};
  }

  async logout(): Promise<void> {
    await this.post('/auth/logout', {});
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      return await this.get<User>('/auth/me');
    } catch (error) {
      // If /auth/me fails (e.g. 401), we just return null instead of throwing
      return null;
    }
  }
}
