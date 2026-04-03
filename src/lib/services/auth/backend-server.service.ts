import type { ApiClient } from '../api/api-client.interface';
import type { IServerService, Server, AccessResponse, AccessStatus } from '../interfaces';

export class BackendServerService implements IServerService {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getServers(): Promise<Server[]> {
    const response = await this.client.get<Server[]>('/api/v1/admin/servers');
    
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch servers');
    }

    return response.data;
  }

  async getServer(name: string): Promise<Server> {
    const response = await this.client.get<Server>(`/api/v1/admin/servers/${name}`);
    
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch server');
    }

    return response.data;
  }

  async createServer(server: Server): Promise<void> {
    const response = await this.client.post('/api/v1/admin/servers', server);
    
    if (response.error) {
      throw new Error(response.error);
    }
  }

  async updateServer(name: string, server: Server): Promise<void> {
    const response = await this.client.put(`/api/v1/admin/servers/${name}`, server);
    
    if (response.error) {
      throw new Error(response.error);
    }
  }

  async deleteServer(name: string): Promise<void> {
    const response = await this.client.delete(`/api/v1/admin/servers/${name}`);
    
    if (response.error) {
      throw new Error(response.error);
    }
  }

  async requestAccess(serverId: string): Promise<AccessResponse> {
    const response = await this.client.post<AccessResponse>('/api/v1/users/access', {
      server_id: serverId
    });
    
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to request access');
    }

    return response.data;
  }

  async checkAccessStatus(server: string): Promise<AccessStatus> {
    const response = await this.client.get<AccessStatus>(`/api/v1/users/access/${server}/status`);
    
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to check access status');
    }

    return response.data;
  }
}
