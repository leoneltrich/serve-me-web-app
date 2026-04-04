import type {ApiClient} from './api/api-client.interface';
import type {AccessResponse, AccessStatus, IServerService, Server} from './interfaces';
import {BaseService} from './base.service';

export class BackendServerService extends BaseService implements IServerService {
  constructor(client: ApiClient) {
      super(client);
  }

  async getServers(): Promise<Server[]> {
      return this.get<Server[]>('/admin/servers');
  }

  async getServer(name: string): Promise<Server> {
      return this.get<Server>(`/admin/servers/${name}`);
  }

  async createServer(server: Server): Promise<void> {
      await this.post('/admin/servers', server);
  }

  async updateServer(name: string, server: Server): Promise<void> {
      await this.put(`/admin/servers/${name}`, server);
  }

  async deleteServer(name: string): Promise<void> {
      await this.delete(`/admin/servers/${name}`);
  }

  async requestAccess(serverId: string): Promise<AccessResponse> {
      return this.post<AccessResponse>('/users/access', {
      server_id: serverId
    });
  }

  async checkAccessStatus(server: string): Promise<AccessStatus> {
      return this.get<AccessStatus>(`/users/access/${server}/status`);
  }
}
