import type { ApiClient } from '../api/api-client.interface';
import type { AuthService } from './auth-service.interface';
import type { User } from './auth.types';

export class BackendAuthService implements AuthService {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async login(username: string, password: string): Promise<User> {
    const response = await this.client.post<User>('/auth/login', {
      username,
      password,
    });

    if (response.error || !response.data) {
      throw new Error(response.error || 'Authentication failed');
    }

    // Combine username from the login request with any other data returned
    return { ...response.data, username };
  }

  async logout(): Promise<void> {
    await this.client.post('/auth/logout', {});
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await this.client.get<User>('/auth/me');
    
    if (response.status === 200 && response.data) {
      return response.data;
    }
    
    return null;
  }
}
