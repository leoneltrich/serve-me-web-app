import type { IAdminService, AdminUser } from './interfaces';

export class MockAdminService implements IAdminService {
  private users = $state<AdminUser[]>([
    { username: 'admin', is_admin: true },
    { username: 'jdoe', is_admin: false },
    { username: 'm_smith', is_admin: false }
  ]);

  async getUsers(): Promise<AdminUser[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate lag
    return this.users;
  }

  async createUser(user: AdminUser): Promise<void> {
    this.users.push(user);
  }

  async updateUser(user: AdminUser): Promise<void> {
    const index = this.users.findIndex(u => u.username === user.username);
    if (index !== -1) this.users[index] = user;
  }

  async deleteUser(username: string): Promise<void> {
    this.users = this.users.filter(u => u.username !== username);
  }
}
