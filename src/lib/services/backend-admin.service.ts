import type {ApiClient} from './api/api-client.interface';
import type {AdminUser, IAdminService} from './interfaces';
import {BaseService} from './base.service';

export class BackendAdminService extends BaseService implements IAdminService {
  constructor(client: ApiClient) {
      super(client);
  }

  async getUsers(): Promise<AdminUser[]> {
      return this.get<AdminUser[]>('/admin/users', {unwrapData: true});
  }

  async createUser(user: AdminUser & { password?: string }): Promise<void> {
      await this.post('/admin/users', user);
  }

  async updateUser(user: AdminUser & { password?: string }): Promise<void> {
      await this.put('/admin/users', user);
  }

  async deleteUser(username: string): Promise<void> {
      await this.delete(`/admin/users/${username}`);
  }
}
