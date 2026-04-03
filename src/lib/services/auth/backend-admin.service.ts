import type { ApiClient } from '../api/api-client.interface';
import type { IAdminService, AdminUser } from '../interfaces';

export class BackendAdminService implements IAdminService {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getUsers(): Promise<AdminUser[]> {
    const response = await this.client.get<{ data: AdminUser[] }>('/admin/users');
    
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch users');
    }

    return response.data.data;
  }

  async createUser(user: AdminUser & { password?: string }): Promise<void> {
    const response = await this.client.post('/admin/users', user);
    
    if (response.error) {
      throw new Error(response.error);
    }
  }

  async updateUser(user: AdminUser & { password?: string }): Promise<void> {
    const response = await this.client.put('/admin/users', user);
    
    if (response.error) {
      throw new Error(response.error);
    }
  }

  async deleteUser(username: string): Promise<void> {
    const response = await this.client.delete(`/admin/users/${username}`);
    
    if (response.error) {
      throw new Error(response.error);
    }
  }
}
